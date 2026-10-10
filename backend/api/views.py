from django.shortcuts import render, redirect
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from django.contrib.auth.hashers import check_password
from django.db import models
from django.db.models.functions import ExtractMonth
from django.core.files.uploadedfile import InMemoryUploadedFile


from api import serializer as api_serializer
from api import models as api_models
from userauths.models import User, Profile

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view, APIView


import random
from decimal import Decimal
import requests
from datetime import datetime, timedelta

from django.core.files.storage import default_storage
import os
# from moviepy.editor import VideoFileClip
from django.core.files.base import ContentFile
import math
from rest_framework.parsers import MultiPartParser, FormParser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi



def to_bool(value):
    if value is None:
        return False
    if isinstance(value, bool):
        return value
    return str(value).lower() in ('true', '1', 'yes', 'on')


def generate_otp(length = 7):
    return "".join([str(random.randint(0, 9)) for _ in range(length)])

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = api_serializer.MyTokenObtainPairSerializer
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = api_serializer.RegisterSerializer
    
class PasswordResetEmailVerifyAPIView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = api_serializer.UserSerializer

    def get_object(self):
        email = self.kwargs.get("email")
        user = User.objects.filter(email=email).first()

        if user:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            user.refresh_token = access_token
            user.otp = generate_otp()
            user.save()

            reset_link = (
                f"{settings.FRONTEND_SITE_URL}/create-new-password/"
                f"?otp={user.otp}&uuidb64={user.pk}&refresh_token={access_token}"
            )

            context = {
                "link": reset_link,
                "username": user.username,
            }

            subject = "Password Reset Request"
            text_body = render_to_string("email/password_reset.txt", context)
            html_body = render_to_string("email/password_reset.html", context)

            email_msg = EmailMultiAlternatives(
                subject=subject,
                body=text_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[user.email],
            )
            email_msg.attach_alternative(html_body, "text/html")
            email_msg.send()

        return user

class PasswordChangeAPIView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = api_serializer.UserSerializer
    
    def create(self, request, *args, **kwargs):
        otp = requests.data['otp']
        uuidb64 = requests.data['uuidb64']
        password = requests.data['passowrd']

        try:
            user = User.objects.get(id = uuidb64, otp = otp)
            user.set_password(password)
            user.save()
            return Response(
                {
                    'message': 'password changed successfully'
                },
                status = status.HTTP_200_OK
            )
        except User.DoesNotExist:
            return Response(
                {'message': 'invalid otp or user not found'},
                status = status.HTTP_404_NOT_FOUND,
            )
            
            
class ChangePasswordAPIView(generics.CreateAPIView):
    serializer_class = api_serializer.UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_passsword')

        try:
            user = User.objects.get(id = user_id)
        except User.DoesNotExist:
            return Response(
                {'message': 'User does not exit', 'icon': 'error'},
                status = status.HTTP_404_NOT_FOUND,
            )
        
        if check_password(old_password, user.password):
            user.set_password(new_password)
            user.save()

            return Response(
                {'message': 'password changed successfully', 'icon': 'success'}
            )
        return Response(
            {'message': 'old passowrd is incorrect', 'icon': 'warning'},
            status = status.HTTP_400_BAD_REQUEST,
        )
        
class ProfileAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = api_serializer.ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        user = User.objects.get(id = user_id)
        return Profile.objects.get(user = user)

class CategoryListAPIView(generics.ListAPIView):
    queryset = api_models.Category.objects.filter(active = True)
    serializer_class = api_serializer.CategorySerializer
    permission_classes = [AllowAny]

class CourseListAPIView(generics.ListAPIView):
    queryset = api_models.Course.objects.filter(
        platform_status = 'Published', teacher_course_status = 'Published'
    )
    serializer_class = api_serializer.CourseSerializer
    permission_classes = [AllowAny]

class TeacherCourseDetailAPIView(generics.RetrieveAPIView):
    serializer_class = api_serializer.CourseSerializer
    permission_classes = [AllowAny]
    queryset = api_models.Course.objects.filter(
        platform_status = 'Published', teacher_course_status = 'Published'
    )
    
    def get_object(self):
        course_id = self.kwargs.get('course_id')
        return api_models.Course.objects.get(
            course_id=course_id,
            platform_status="Published",
            teacher_course_status="Published",
        )
        

class CartAPIView(generics.CreateAPIView):
    queryset = api_models.Cart.objects.all()
    serializer_class = api_serializer.CartSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        course_id = request.data['course_id']
        user_id = request.data['user_id']
        price = request.data['price']
        country_name = request.data['country_name']
        cart_id = request.data['cart_id']

        # print('course id =======', course_id)
        course = api_models.Course.objects.filter(id = course_id).first()

        user = User.objects.filter(id = user_id).first() if user_id != 'undefined' else None
        
        try:
            country_object = api_models.Country.objects.filter(name = country_name).first()
            country = country_object.name
        except:
            country_object = None
            country = 'United States'
        
        if country_object:
            tax_rate = country_object.tax_rate / 100
        else:
            tax_rate = 0
            
        cart = api_models.Cart.objects.filter(cart_id=cart_id, course=course).first()
        
        
        
        if cart:
            cart.course = course
            cart.user = user
            cart.price = price
            cart.tax_fee = Decimal(price) * Decimal(tax_rate)
            cart.country = country
            cart.total = Decimal(cart.price) + Decimal(cart.tax_fee)
            cart.save()
            return Response(
                {"message": "Cart updated successfully"}, status=status.HTTP_200_OK
            )
        else:
            cart = api_models.Cart()

            cart.course = course
            cart.user = user
            cart.price = price 
            cart.tax_free = Decimal(print) * Decimal(tax_rate)
            cart.country = country
            cart.cart_id = cart_id
            cart.total = Decimal(cart.price) + Decimal(cart.tax_free)        
            cart.save()

            return Response({
                'message': 'cart created successfully'
            }, status = status.HTTP_201_CREATED)
            
class CartListAPIView(generics.ListAPIView):
    serializer_class = api_serializer.CartSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        cart_id = self.kwargs['cart_id']
        self.queryset = api_models.Cart.objects.filter(cart_id = cart_id)
        return self.queryset
    
class CartItemDeleteAPIView(generics.DestroyAPIView):
    serializer_class = api_serializer.CartSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        cart_id = self.kwargs['cart_id']
        item_id = self.kwargs['item_id']

        return api_models.Cart.objects.filter(
            cart_id = cart_id,
            id = item_id
        ).first()
        
class CartStatsAPIView(generics.RetrieveAPIView):
    serializer_class = api_serializer.CartSerializer
    permission_classes = [AllowAny]
    lookup_field = 'cart_id'

    def get_queryset(self):
        cart_id = self.kwargs['cart_id']
        self.queryset = api_models.Cart.objects.filter(cart_id = cart_id)
        return self.queryset

    def get(self, request, *args, **kwargs):
        self.queryset = self.get_queryset()

        total_price = 0.00
        total_tax = 0.00
        total_total = 0.00

        for cart_item in self.queryset:
            total_price += float(self.calculate_price(cart_item))
            total_tax += float(self.calculate_tax(cart_item))
            total_total += round(float(self.calculate_total(cart_item)), 2)

        data = {
            'price': total_price,
            'tax': total_tax,
            'total': total_total,
        }
        
        return Response(data)

    def calculate_price(self, cart_item):
        return cart_item.price
    
    def calculate_tax(self, cart_item):
        return cart_item.tax_fee

    def calculate_total(self, cart_item):
            return cart_item.total
        
class CreateOrderAPIView(generics.CreateAPIView):
    serializer_class = api_serializer.CartOrderSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        full_name = request.data.get('full_name')
        email = request.data.get('email')
        country = request.data.get('country')
        cart_id = request.data.get('cart_id')
        user = request.user
        
        cart_items = api_models.Cart.objects.filter(cart_id = cart_id)

        order = api_models.CartOrder.objects.create(
            full_name = full_name,
            email = email, 
            country = country,
            student = user,
        )
        
        total_price = Decimal("0.00")
        total_tax = Decimal("0.00")
        total_total = Decimal("0.00")
        
        for item in cart_items:
            api_models.CartOrderItem.objects.create(
                order=order,
                course=item.course,
                price=item.price,
                tax_fee=item.tax_fee,
                total=item.total,
                initial_total=item.total,
                teacher=item.course.teacher,
            )
            
            total_price += Decimal(item.price)
            total_tax += Decimal(item.tax_fee)
            total_total += Decimal(item.total)
            order.teachers.add(item.course.teacher)
            
        order.sub_total = total_price
        order.tax_fee = total_tax
        order.initial_total = total_total
        order.total = total_total
        order.save()

        return Response(
            {'message' : 'order created successfully', 'order_oid': order.oid},
            status = status.HTTP_201_CREATED,
        )
        
class CheckoutAPIView(generics.RetrieveAPIView):
    serializer_class = api_serializer.CartOrderSerializer
    permission_classes = [IsAuthenticated]
    queryset = api_models.CartOrder.objects.all()
    lookup_field = 'oid'
    
class CouponApplyAPIView(generics.CreateAPIView):
    serializer_class = api_serializer.CouponSerializer
    permission_classes = [IsAuthenticated]
    
    
    def create(self, request, *args, **kwargs):
        order_oid = request.data.get('order_oid')
        coupun_code = request.data.get('coupon_code')

        order = api_models.CartOrder.objects.get(oid = order_oid)
        coupon = api_models.Coupon.objects.filter(code = coupun_code).first()

        if not coupon:
            return Response(
                {"message": "Coupon not found", "icon": "error"},
                status=status.HTTP_404_NOT_FOUND,
            )
            
        order_items = api_models.CartOrderItem.objects.filter(
            order = order, 
            teacher = coupon.teacher
        )
        
        for item in order_items:
            if coupon in item.coupons.all():
                 return Response(
                    {"message": "coupon already applied", "icon": "warning"},
                    status=status.HTTP_200_OK,
                )
                 
            discount = item.total * coupon.discount / 100
            item.total -= discount
            item.price -= discount
            item.saved += discount
            item.applied_coupon = True
            item.coupons.add(coupon)
            item.save()

            order.coupons.add(coupon)
            order.total -= discount
            order.sub_total -= discount
            order.saved += discount
            order.save()

            coupon.used_by.add(order.student)

        return Response(
            {"message": "coupon applied successfully", "icon": "success"},
            status=status.HTTP_200_OK,
        )
        
        
class SearchCourseAPIView(generics.ListAPIView):
    serializer_class = api_serializer.CourseSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        query = self.request.GET.get('query')
        return api_models.Course.objects.filter(title__icontains = query, platform_status = 'Published', teacher_course_status='Published')

class StudentSummaryAPIView(generics.ListAPIView):
    serializer_class = api_serializer.StudentSummarySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        user = User.objects.get(id = user_id)

        return [
            {
                "total_courses": api_models.EnrollCourse.objects.filter(user = user).count(),
                'completed_lessons': api_models.CompletedLesson.objects.filter(user = user).count(),
                'achieved_certificates': api_models.Certificate.objects.filter(user = user).count()
            }
        ]
        
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, mane = True)
        return Response(serializer.data)
    
    
class StudentCourseListAPIView(generics.ListAPIView):
    serializer_class = api_serializer.EnrolledCourseSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id = user_id)
        return api_models.EnrollCourse.objects.filter( user = user )

class StudentCourseDetailAPIView(generics.RetrieveAPIView):
    serializer_class = api_serializer.EnrolledCourseSerializer
    permission_classes = [AllowAny]
    lookup_field = 'enrollmnet_id'


    def get_object(self):
        user_id = self.kwargs.get('user_id')
        enrollment_id = self.kwargs.get('enrollment_id')
        user = User.objects.get(id = user_id)
        return api_models.EnrollCourse.objects.get(
            user = user,
            enrollment_id = enrollment_id
        )
        
        
class StudentCourseCompletedCreateAPIView(generics.CreateAPIView):
    serializer_class = api_serializer.CompletedLessonSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        user_id = request.data.get("user_id")
        course_id = request.data.get("course_id")
        variant_item_id = request.data.get("variant_item_id")

        user = User.objects.get(id=user_id)
        course = api_models.Course.objects.get(id=course_id)
        variant_item = api_models.VariantItem.objects.get(
            variant_item_id=variant_item_id
        )

        completed = api_models.CompletedLesson.objects.filter(
            user=user, course=course, variant_item=variant_item
        ).first()

        if completed:
            completed.delete()
            return Response({"message": "Lesson marked as incomplete"})

        api_models.CompletedLesson.objects.create(
            user=user, course=course, variant_item=variant_item
        )
        return Response({"message": "Lesson marked as completed"})
    

class StudentNoteCreateAPIView(generics.ListCreateAPIView):
    serializer_class = api_serializer.NoteSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        enrollment_id = self.kwargs['enrollment_id']

        user = User.objects.get(id = user_id)
        enrolled = api_models.EnrollCourse.objects.get(enrollment_id = enrollment_id)

        return api_models.Note.objects.filter(user = user, course = enrolled.course)

    def create(self, request, *args, **kwargs):
        user_id = request.data['user_id']
        enrollment_id = request.data['enrollment_id']
        title = request.data['title']
        note = request.data['note']

        user = User.objects.get(id = user_id)
        enrolled = api_models.EnrollCourse.objects.get(enrollment_id = enrollment_id)

        api_models.Note.objects.create(user = user, course = enrolled.course, note = note, title = title)

        return Response(
            {'message': 'note created successfully'},
            status = status.HTTP_201_CREATED
        )
        
class StudentNoteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = api_serializer.NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user_id = self.kwargs.get("user_id")
        enrollment_id = self.kwargs.get("enrollment_id")
        note_id = self.kwargs.get("note_id")

        user = User.objects.get(id=user_id)
        enrolled = api_models.EnrolledCourse.objects.get(enrollment_id=enrollment_id)
        return api_models.Note.objects.get(
            user=user, course=enrolled.course, id=note_id
        )


class StudentRateCourseCreateAPIView(generics.CreateAPIView):
    serializer_class = api_serializer.ReviewSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        course_id = request.data.get('course_id')
        rating = request.data.get('rating')
        review = request.data.get('review')

        user = User.objects.get(id = user_id)
        course = api_models.Course.objects.get(id = course_id)


        api_models.Review.objects.create(
            user = user,
            course = course,
            review = review,
            rating = rating,
            active = True
        )
        
        return Response(
            {
                "message": 'reviews submitted succcessfully'
            },
            status = status.HTTP_201_CREATED
        )
        
class StudentRateCourseUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = api_serializer.ReviewSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        user_id = self.kwargs.get("user_id")
        review_id = self.kwargs.get("review_id")
        user = User.objects.get(id=user_id)
        return api_models.Review.objects.get(id=review_id, user=user)
    

class StudentWishListListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = api_serializer.WishlistSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")
        user = User.objects.get(id=user_id)
        return api_models.Wishlist.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        user_id = request.data.get("user_id")
        course_id = request.data.get("course_id")

        user = User.objects.get(id=user_id)
        course = api_models.Course.objects.get(id=course_id)

        wishlist = api_models.Wishlist.objects.filter(user=user, course=course).first()
        if wishlist:
            wishlist.delete()
            return Response({"message": "Removed from wishlist"}, status=status.HTTP_200_OK)

        api_models.Wishlist.objects.create(user=user, course=course)
        return Response(
            {"message": "Added to wishlist"}, status=status.HTTP_201_CREATED
        )
        
        
        
class QuestionAnswerListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = api_serializer.Question_AnswerSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = api_models.Course.objects.get(id=course_id)
        return api_models.Question_Answer.objects.filter(course=course)
    
    
    def create(self, request, *args, **kwargs):
        course_id = request.data['course_id']
        user_id = request.data['user_id']
        title = request.data['title']
        message = request.data['message']

        user = User.objects.get(id = user_id)
        course = api_models.Course.objects.get(id = course_id)

        question = api_models.Question_Answer.objects.create(
            course = course,
            user = user,
            title = title,
        )
        
        api_models.Question_Answer_Message.objects.create(
            course = course,
            user = user,
            message = message,
            question = question
        )
        
        return Response({
            "message": "Group conversation Started"
            }, status=status.HTTP_201_CREATED)



class QuestionAnswerMessageSendAPIView(generics.CreateAPIView):
    serializer_class = api_serializer.Question_Answer_MessageSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        course_id = request.data.get('course_id')
        qa_id = request.data.get('qa_id')
        user_id = request.data.get("user_id")
        message = request.data.get("message")

        user = User.objects.get(id=user_id)
        course = api_models.Course.objects.get(id=course_id)
        question = api_models.Question_Answer.objects.get(qa_id=qa_id)
        api_models.Question_Answer_Message.objects.create(
            course = course,
            user = user,
            message = message,
            question = question,
        )
        
        question_serializer = api_serializer.Question_AnswerSerializer(question)

        return Response({' message': 'message sent', 'question': question_serializer.data})
    
class TeacherSummaryAPIView(generics.ListAPIView):
    serializer_class = api_serializer.TeacherSummarySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        teacher_id = self.kwargs.get("teacher_id")
        teacher = api_models.Teacher.objects.get(id=teacher_id)
        one_month_ago = datetime.today() - timedelta(days=28)

        total_courses = api_models.Course.objects.filter(teacher=teacher).count()
        total_revenue = (
            api_models.CartOrderItem.objects.filter(
                teacher=teacher, order__payment_status="Paid"
            ).aggregate(total=models.Sum("price"))["total"]
            or 0
        )
        monthly_revenue = (
            api_models.CartOrderItem.objects.filter(
                teacher=teacher,
                order__payment_status="Paid",
                date__gte=one_month_ago,
            ).aggregate(total=models.Sum("price"))["total"]
            or 0
        )

        enrolled_course = api_models.EnrolledCourse.objects.filter(teacher=teacher)
        unique_students = {e.user_id for e in enrolled_course}

        return [
            {
                "total_courses": total_courses,
                "total_revenue": total_revenue,
                "monthly_revenue": monthly_revenue,
                "total_students": len(unique_students),
            }
        ]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
class TeacherCourseListAPIView(generics.ListAPIView):
    serializer_class = api_serializer.CourseSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = api_models.Teacher.objects.get(id = teacher_id)
        return api_models.Course.objects.filter(teacher = teacher)

class TeacherReviewListAPIView(generics.ListAPIView):
    serializer_class = api_serializer.CourseSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = api_models.Teacher.objects.get(id = teacher_id)
        return api_models.Review.objects.filter(course__teacher = teacher)

class TeacherReviewDetailAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = api_serializer.ReviewSerializer
    permission_classes = [AllowAny]


    def get_object(self):
        teacher_id = self.kwargs['teacher_id']
        review_id = self.kwargs['review_id']
        teacher = api_models.Teacher.objects.get(id = teacher_id)
        return api_models.Review.objects.get(course__teacher = teacher, id = review_id)

class TeacherStudentsListAPIView(viewsets.ViewSet):
    def list(self, request, teacher_id=None):
        teacher = api_models.Teacher.objects.get(id=teacher_id)
        enrolled = api_models.EnrolledCourse.objects.filter(teacher=teacher)

        students = []
        seen = set()

        for enrollment in enrolled:
            if enrollment.user_id not in seen:
                user = User.objects.get(id=enrollment.user_id)
                students.append(
                    {
                        "full_name": user.profile.full_name,
                        "image": user.profile.image.url if user.profile.image else None,
                        "country": user.profile.country,
                        "date": enrollment.date,
                    }
                )
                seen.add(enrollment.user_id)

        return Response(students)
    
@api_view(["GET"])
def TeacherAllMonthEarningAPIView(request, teacher_id):
    teacher = api_models.Teacher.objects.get(id=teacher_id)
    earnings = (
        api_models.CartOrderItem.objects.filter(
            teacher=teacher, order__payment_status="Paid"
        )
        .annotate(month=ExtractMonth("date"))
        .values("month")
        .annotate(total_earning=models.Sum("price"))
        .order_by("month")
    )
    return Response(earnings)

class TeacherBestSellingCourseAPIView(viewsets.ViewSet):
    def list(self, request, teacher_id=None):
        teacher = api_models.Teacher.objects.get(id=teacher_id)
        courses = api_models.Course.objects.filter(teacher=teacher)
        result = []

        for course in courses:
            revenue = (
                course.enrolledcourse_set.aggregate(
                    total=models.Sum("order_item__price")
                )["total"]
                or 0
            )
            sales = course.enrolledcourse_set.count()
            result.append(
                {
                    "course_image": course.image.url if course.image else None,
                    "course_title": course.title,
                    "revenue": revenue,
                    "sales": sales,
                }
            )
        return Response(result)


class TeacherCourseOrdersListAPIView(generics.ListAPIView):
    serializer_class = api_serializer.CartOrderItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        teacher_id = self.kwargs.get('teacher_id')
        teacher = api_models.Teacher.objects.get(id = teacher_id)
        return api_models.CartOrderItem.objects.filter(teacher = teacher)

class TeacherQuestionAnswerListAPIView(generics.ListAPIView):
    serializer_class = api_serializer.Question_AnswerSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        teacher_id = self.kwargs.get("teacher_id")
        teacher = api_models.Teacher.objects.get(id=teacher_id)
        return api_models.Question_Answer.objects.filter(course__teacher=teacher)


class TeacherCouponListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = api_serializer.CouponSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        teacher_id = self.kwargs.get("teacher_id")
        teacher = api_models.Teacher.objects.get(id=teacher_id)
        return api_models.Coupon.objects.filter(teacher=teacher)


class TeacherCouponDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = api_serializer.CouponSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        teacher_id = self.kwargs.get("teacher_id")
        coupon_id = self.kwargs.get("coupon_id")
        teacher = api_models.Teacher.objects.get(id=teacher_id)
        return api_models.Coupon.objects.get(teacher=teacher, id=coupon_id)


class TeacherNotificationListAPIView(generics.ListAPIView):
    serializer_class = api_serializer.NotificationSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        teacher_id = self.kwargs.get("teacher_id")
        teacher = api_models.Teacher.objects.get(id=teacher_id)
        return api_models.Notification.objects.filter(teacher=teacher, seen=False)



class TeacherNotificationDetailAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = api_serializer.NotificationSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        teacher_id = self.kwargs.get("teacher_id")
        noti_id = self.kwargs.get("noti_id")
        teacher = api_models.Teacher.objects.get(id=teacher_id)
        return api_models.Notification.objects.get(teacher=teacher, id=noti_id)
    
    
    
class CourseCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        title = request.data.get('title')
        descriptions = request.data.get('description')
        image = request.data.get('image')
        file = request.data.get('file')
        level = request.data.get('level') 
        language = request.data.get('language')
        price = request.data.get('price')
        category = request.data.get('category')

        category_obj = api_models.Category.objects.filter(id=category).first()
        teacher = api_models.Teacher.objects.get(user=request.user)
        
        course = api_models.Course.objects.create(
            teacher = teacher,
            category = category_obj,
            file = file, 
            image = image,
            title = title,
            descriptions = descriptions,
            price = price,
            language = language,
            level = level,
        )
        
        return Response(
            {'message': 'course  created', 'course_id': course.course_id},
            status = status.HTTP_201_CREATED
        )
        
class CourseUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = api_models.Course.objects.all()
    serializer_class = api_serializer.CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        teacher_id = self.kwargs.get("teacher_id")
        course_id = self.kwargs.get("course_id")
        teacher = api_models.Teacher.objects.get(id=teacher_id)
        return api_models.Course.objects.get(teacher=teacher, course_id=course_id)

    def update(self, request, *args, **kwargs):
        course = self.get_object()
        serializer = self.get_serializer(course, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if "image" in request.data:
            if isinstance(request.data["image"], InMemoryUploadedFile):
                course.image = request.data["image"]
            elif str(request.data["image"]) == "No File":
                course.image = None

        if "file" in request.data and not str(request.data["file"]).startswith("http"):
            course.file = request.data["file"]

        category_id = request.data.get("category")
        if category_id and category_id not in ["NaN", "undefined", None]:
            course.category = api_models.Category.objects.get(id=category_id)

        self.perform_update(serializer)
        self._update_variants(course, request.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def _update_variants(self, course, data):
        for key, value in data.items():
            if key.startswith("variants") and "[variant_title]" in key:
                index = key.split("[")[1].split("]")[0]
                title = value
                variant_id = data.get(f"variants[{index}][variant_id]")

                items = []
                current = {}
                for item_key, item_value in data.items():
                    if f"variants[{index}][items]" in item_key:
                        field = item_key.split("[")[-1].split("]")[0]
                        if field == "title" and current:
                            items.append(current)
                            current = {}
                        current[field] = item_value
                if current:
                    items.append(current)

                variant = course.variant_set.filter(id=variant_id).first()
                if variant:
                    variant.title = title
                    variant.save()
                    self._update_variant_items(variant, items)
                else:
                    new_variant = api_models.Variant.objects.create(
                        course=course, title=title
                    )
                    for item in items:
                        api_models.VariantItem.objects.create(
                            variant=new_variant,
                            title=item.get("title"),
                            description=item.get("description"),
                            file=item.get("file"),
                            preview=to_bool(item.get("preview")),
                        )

    def _update_variant_items(self, variant, items):
        for item in items[1:]:  # skip first empty item if present
            variant_item = api_models.VariantItem.objects.filter(
                variant_item_id=item.get("variant_item_id")
            ).first()

            file = item.get("file")
            if not file or str(file).startswith("http") or file == "null":
                file = None

            if variant_item:
                variant_item.title = item.get("title")
                variant_item.description = item.get("description")
                variant_item.preview = to_bool(item.get("preview"))
                if file:
                    variant_item.file = file
                variant_item.save()
            else:
                api_models.VariantItem.objects.create(
                    variant=variant,
                    title=item.get("title"),
                    description=item.get("description"),
                    file=file,
                    preview=to_bool(item.get("preview")),
                )
                
class CourseDetailAPIView(generics.RetrieveAPIView):
    serializer_class = api_serializer.CourseSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        slug = self.kwargs.get('slug')
        return api_models.Course.objects.get(slug = slug)

class CourseVariantDeleteAPIView(generics.DestroyAPIView):
    serializer_class = api_serializer.VariantSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        variant_id = self.kwargs.get("variant_id")
        teacher_id = self.kwargs.get("teacher_id")
        course_id = self.kwargs.get("course_id")

        teacher = api_models.Teacher.objects.get(id=teacher_id)
        course = api_models.Course.objects.get(teacher=teacher, course_id=course_id)
        return api_models.Variant.objects.get(id=variant_id, course=course)
    
    
class CourseVariantItemDeleteAPIView(generics.DestroyAPIView):
    serializer_class = api_serializer.VariantItemSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        variant_id = self.kwargs.get("variant_id")
        variant_item_id = self.kwargs.get("variant_item_id")
        teacher_id = self.kwargs.get("teacher_id")
        course_id = self.kwargs.get("course_id")

        teacher = api_models.Teacher.objects.get(id=teacher_id)
        course = api_models.Course.objects.get(teacher=teacher, course_id=course_id)
        variant = api_models.Variant.objects.get(variant_id=variant_id, course=course)
        return api_models.VariantItem.objects.get(
            variant=variant, variant_item_id=variant_item_id
        )
        
class FileUploadAPIView(APIView):
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)

    @swagger_auto_schema(
        operation_description="Upload a file (image or video)",
        request_body=api_serializer.FileUploadSerializer,
        responses={
            200: openapi.Response("File uploaded successfully"),
            400: openapi.Response("No file provided"),
        },
    )
    def post(self, request):
        serializer = api_serializer.FileUploadSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST
            )

        file = serializer.validated_data.get("file")
        file_path = default_storage.save(file.name, ContentFile(file.read()))
        file_url = request.build_absolute_uri(default_storage.url(file_path))

        if file.name.lower().endswith((".mp4", ".avi", ".mov", ".mkv")):
            full_path = os.path.join(default_storage.location, file_path)
            clip = VideoFileClip(full_path)
            minutes, seconds = divmod(clip.duration, 60)
            duration_text = f"{math.floor(minutes)}m {math.floor(seconds)}s"
            return Response({"url": file_url, "video_duration": duration_text})

        return Response({"url": file_url})
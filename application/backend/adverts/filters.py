import django_filters

from adverts.models import Adverts

class AdvertsFilter(django_filters.FilterSet):
    courses = django_filters.CharFilter(field_name='courses__name',lookup_expr='icontains')
    catagories = django_filters.CharFilter(field_name='catagories__name',lookup_expr='icontains')
    professors = django_filters.CharFilter(field_name='courses__professor__name',lookup_expr='icontains')
    verified = django_filters.BooleanFilter(field_name='verified')
    description = django_filters.CharFilter(field_name='description',lookup_expr='icontains')

    class Meta:
        model = Adverts
        fields = ['courses','catagories','professors','verified','description']

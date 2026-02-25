import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/api_client.dart';
import '../domain/product.dart';

final productRepositoryProvider = Provider<ProductRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return ProductRepository(dio);
});

class ProductRepository {
  final Dio _dio;

  ProductRepository(this._dio);

  Future<List<Product>> getProducts({
    String? categoryId,
    String? searchUrl,
    int page = 1,
    int pageSize = 20,
  }) async {
    try {
      final queryParams = <String, dynamic>{
        'pageNumber': page,
        'pageSize': pageSize,
      };
      if (categoryId != null) {
        queryParams['categoryId'] = categoryId;
      }

      final response = await _dio.get('Products', queryParameters: queryParams);

      if (response.statusCode == 200) {
        // According to standard Clean Architecture pagination, might wrapped in "items"
        final List<dynamic> data = response.data['items'] ?? response.data;
        return data.map((json) => Product.fromJson(json)).toList();
      }
      throw Exception('Failed to load products');
    } catch (e) {
      // In a real app we would map this to Domain Exceptions
      throw Exception('Failed to load products: \$e');
    }
  }
}

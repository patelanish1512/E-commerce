import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/product.dart';
import '../data/product_repository.dart';

// Provides the state of our product feed
final productsProvider = FutureProvider.autoDispose<List<Product>>((ref) async {
  final repository = ref.watch(productRepositoryProvider);
  return repository.getProducts();
});

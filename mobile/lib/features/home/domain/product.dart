class Product {
  final String id;
  final String name;
  final String description;
  final double basePrice;
  final double discountPrice;
  final String categoryName;
  final int stock;
  final double rating;

  Product({
    required this.id,
    required this.name,
    required this.description,
    required this.basePrice,
    required this.discountPrice,
    required this.categoryName,
    required this.stock,
    required this.rating,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      name: json['name'],
      description: json['description'] ?? '',
      basePrice: (json['basePrice'] as num).toDouble(),
      discountPrice: (json['discountPrice'] as num).toDouble(),
      categoryName: json['categoryName'] ?? '',
      stock: json['stock'] ?? 0,
      rating: (json['rating'] as num?)?.toDouble() ?? 0.0,
    );
  }
}

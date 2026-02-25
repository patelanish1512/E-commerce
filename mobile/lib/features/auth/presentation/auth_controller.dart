import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/api_client.dart';
import '../../../core/router/app_router.dart';

final authProvider = NotifierProvider<AuthController, bool>(() {
  return AuthController();
});

class AuthController extends Notifier<bool> {
  @override
  bool build() {
    final prefs = ref.watch(sharedPreferencesProvider);
    final token = prefs.getString('auth_token');
    return token != null && token.isNotEmpty;
  }

  Future<void> login(String email, String password) async {
    try {
      final dio = ref.read(dioProvider);
      final response = await dio.post(
        'auth/login',
        data: {'email': email, 'password': password},
      );

      final token = response.data['token'] as String?;
      if (token != null) {
        final prefs = ref.read(sharedPreferencesProvider);
        await prefs.setString('auth_token', token);
        state = true;
      } else {
        throw Exception('No token returned');
      }
    } catch (e) {
      throw Exception('Login failed: $e');
    }
  }

  Future<void> logout() async {
    final prefs = ref.read(sharedPreferencesProvider);
    await prefs.remove('auth_token');
    state = false;
    appRouter.go('/login');
  }
}

/**
 * API Client for SecureBlog Backend
 * Handles all API communication with proper error handling and security
 */

// API Base URL - should point to your backend API
// Backend NestJS runs on port 4000 by default, routes are directly under /auth, /users, etc. (no /api prefix)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    // Use the baseUrl as-is from environment variable
    // User should configure the full URL including /api if needed
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    // Log API URL in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Client] Base URL:', this.baseUrl);
    }
  }

  /**
   * Make an authenticated request to the API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Get CSRF token from cookie if available
    const csrfToken = this.getCsrfToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add CSRF token if available
    if (csrfToken) {
      (headers as Record<string, string>)['X-CSRF-Token'] = csrfToken;
    }

    // Include credentials (cookies) for all requests
    const config: RequestInit = {
      ...options,
      headers,
      credentials: 'include', // Important for cookies (HttpOnly, Secure)
    };

    try {
      const response = await fetch(url, config);

      // Handle network errors
      if (!response.ok && response.status === 0) {
        throw {
          message: 'Erreur réseau. Vérifiez que le serveur backend est démarré et accessible.',
          status: 0,
        } as ApiError;
      }

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        if (!response.ok) {
          throw {
            message: `Erreur HTTP ${response.status}: ${response.statusText}`,
            status: response.status,
          } as ApiError;
        }
        return {} as T;
      }

      const data = await response.json();

      if (!response.ok) {
        const error: ApiError = {
          message: data.message || `Erreur ${response.status}: ${response.statusText}`,
          status: response.status,
          errors: data.errors,
        };
        throw error;
      }

      return data;
    } catch (error) {
      // If it's already an ApiError, rethrow it
      if (error && typeof error === 'object' && 'status' in error) {
        throw error;
      }
      
      // Handle fetch errors (network, CORS, etc.)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw {
          message: 'Impossible de contacter le serveur. Vérifiez que le backend est démarré sur ' + this.baseUrl,
          status: 0,
        } as ApiError;
      }

      // Generic error handling
      throw {
        message: error instanceof Error ? error.message : 'Erreur réseau inconnue',
        status: 0,
      } as ApiError;
    }
  }

  /**
   * Get CSRF token from cookies
   */
  private getCsrfToken(): string | null {
    if (typeof document === 'undefined') return null;
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'csrf-token') {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Auth API endpoints
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string; // Not sent to backend, only for frontend validation
  consent: boolean; // Will be mapped to consentGiven for backend
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface AuthResponse {
  user?: User;
  message?: string;
  access_token?: string; // For login response
}

export interface SessionResponse {
  user: User | null;
  authenticated: boolean;
}

const apiClient = new ApiClient();

export const authApi = {
  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
  },

  /**
   * Register new user
   */
  async register(data: RegisterRequest): Promise<{ message: string }> {
    // Remove confirmPassword and map consent to consentGiven for backend
    const { confirmPassword, consent, ...registerData } = data;
    return apiClient.post<{ message: string }>('/auth/register', {
      ...registerData,
      consentGiven: consent,
    });
  },

  /**
   * Logout user
   */
  async logout(): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/auth/logout');
  },

  /**
   * Get current session
   * Retry logic for network errors
   */
  async getSession(): Promise<SessionResponse> {
    try {
      return await apiClient.get<SessionResponse>('/auth/session');
    } catch (error) {
      // Si c'est une erreur réseau (status 0), ne pas la propager comme 401
      const apiError = error as ApiError;
      if (apiError.status === 0) {
        // Erreur réseau - retourner une session non authentifiée plutôt que de throw
        return {
          authenticated: false,
          user: null,
        };
      }
      throw error;
    }
  },

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },
};

// Posts API endpoints (backend uses /posts, not /articles)
export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  imageUrl?: string;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  imageUrl?: string;
}

export const postsApi = {
  /**
   * Get all posts
   */
  async getAll(): Promise<Post[]> {
    return apiClient.get<Post[]>('/posts');
  },

  /**
   * Get post by ID (includes comments)
   */
  async getById(id: string): Promise<Post> {
    return apiClient.get<Post>(`/posts/${id}`);
  },

  /**
   * Create post (requires authentication)
   */
  async create(data: CreatePostRequest): Promise<Post> {
    return apiClient.post<Post>('/posts', data);
  },

  /**
   * Update post (requires authentication + ownership or admin)
   * IDOR protection: Backend must verify user owns the post or is admin
   */
  async update(id: string, data: UpdatePostRequest): Promise<Post> {
    // IDOR protection: The backend should verify that the authenticated user
    // owns this post (authorId matches) or is an admin
    // Backend uses PATCH
    return apiClient.patch<Post>(`/posts/${id}`, data);
  },

  /**
   * Delete post (requires authentication + ownership or admin)
   * IDOR protection: Backend must verify user owns the post or is admin
   */
  async delete(id: string): Promise<{ message: string }> {
    // IDOR protection: The backend should verify that the authenticated user
    // owns this post (authorId matches) or is an admin
    return apiClient.delete<{ message: string }>(`/posts/${id}`);
  },
};

// Alias for backward compatibility
export const articlesApi = postsApi;
export type Article = Post;
export type CreateArticleRequest = CreatePostRequest;
export type UpdateArticleRequest = UpdatePostRequest;

// Comments API endpoints
export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: {
    id: string;
    name: string;
  };
  postId?: string;
  post?: Post;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentRequest {
  content: string;
}

export const commentsApi = {
  /**
   * Get comment by ID
   */
  async getById(id: string): Promise<Comment> {
    return apiClient.get<Comment>(`/posts/:postId/comments/${id}`);
  },

  /**
   * Create comment (requires authentication)
   * Comments are created under a post: POST /posts/:postId/comments
   * Backend returns comment with author relation (now properly loaded)
   */
  async create(postId: string, data: CreateCommentRequest): Promise<Comment> {
    const response = await apiClient.post<{
      id: string;
      content: string;
      authorId: string;
      postId: string;
      author: {
        id: string;
        name: string;
      };
      createdAt: string;
      updatedAt: string;
    }>(`/posts/${postId}/comments`, data);
    
    // Backend now returns comment with relations, so we can use it directly
    return {
      id: response.id,
      content: response.content,
      authorId: response.authorId || response.author?.id || "",
      author: {
        id: response.author?.id || response.authorId || "",
        name: response.author?.name || "Utilisateur",
      },
      postId: postId,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt || response.createdAt,
    };
  },

  /**
   * Delete comment (requires authentication + ownership or admin)
   * IDOR protection: Backend must verify user owns the comment or is admin
   */
  async delete(postId: string, commentId: string): Promise<{ message: string }> {
    // IDOR protection: The backend should verify that the authenticated user
    // owns this comment (authorId matches) or is an admin
    return apiClient.delete<{ message: string }>(`/posts/${postId}/comments/${commentId}`);
  },
};

// Users API endpoints
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export const usersApi = {
  /**
   * Get all users (admin only)
   */
  async getAll(): Promise<UserProfile[]> {
    return apiClient.get<UserProfile[]>('/users');
  },

  /**
   * Get user by ID (own profile or admin)
   * IDOR protection: Backend verifies user can only see their own profile
   */
  async getById(id: string): Promise<UserProfile> {
    return apiClient.get<UserProfile>(`/users/${id}`);
  },

  /**
   * Update user (own profile or admin)
   * IDOR protection: Backend verifies user can only update their own profile
   */
  async update(id: string, data: { name?: string; email?: string }): Promise<UserProfile> {
    return apiClient.patch<UserProfile>(`/users/${id}`, data);
  },
};

export default apiClient;

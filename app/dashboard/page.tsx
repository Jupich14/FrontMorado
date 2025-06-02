'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { postsService, authService } from '@/services/api';

interface Post {
  id: number;
  user: {
    id: number;
    email: string;
  };
  content: string;
  image_url?: string;
  likes: number;
  comments: number;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('siguiendo');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = () => {
      if (!authService.isAuthenticated()) {
        router.push('/login');
        return;
      }
      setUser(authService.getUser());
    };

    checkAuth();
    loadPosts();
  }, [router]);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await postsService.getPosts();
      setPosts(response.posts);
    } catch (err: any) {
      if (err.response?.status === 401) {
        authService.logout();
        router.push('/login');
      } else {
        setError('Error al cargar los posts');
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (postId: number) => {
    try {
      const response = await postsService.likePost(postId);
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
    } catch (err: any) {
      if (err.response?.status === 401) {
        authService.logout();
        router.push('/login');
      } else {
        console.error('Error al dar like:', err);
      }
    }
  };

  const handleComment = async (postId: number) => {
    try {
      const comment = prompt('Escribe tu comentario:');
      if (comment) {
        const response = await postsService.commentPost(postId, comment);
        setPosts(posts.map(post => 
          post.id === postId ? { ...post, comments: post.comments + 1 } : post
        ));
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        authService.logout();
        router.push('/login');
      } else {
        console.error('Error al comentar:', err);
      }
    }
  };

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-16">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-xl font-semibold text-center py-4">PlanPlan</h1>
          <div className="flex justify-center space-x-8 pb-4">
            <button
              onClick={() => setActiveTab('siguiendo')}
              className={`text-sm font-medium ${
                activeTab === 'siguiendo'
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500'
              }`}
            >
              Siguiendo
            </button>
            <button
              onClick={() => setActiveTab('parati')}
              className={`text-sm font-medium ${
                activeTab === 'parati'
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500'
              }`}
            >
              Para ti
            </button>
            <button
              onClick={() => setActiveTab('favoritos')}
              className={`text-sm font-medium ${
                activeTab === 'favoritos'
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500'
              }`}
            >
              Favoritos
            </button>
          </div>
        </div>
      </header>

      {/* Feed */}
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg border border-gray-200">
            {/* Post Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full w-full flex items-center justify-center text-gray-500">
                    {post.user.email.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div>
                  <p className="font-medium">{post.user.email.split('@')[0]}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <button className="text-gray-500">
                <span className="text-2xl">...</span>
              </button>
            </div>

            {/* Post Image */}
            {post.image_url && (
              <div className="aspect-square relative">
                <img
                  src={post.image_url}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Post Content */}
            <div className="p-4">
              <p className="text-sm">{post.content}</p>
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between px-4 pb-4">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-1"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>{post.likes}</span>
                </button>
                <button 
                  onClick={() => handleComment(post.id)}
                  className="flex items-center space-x-1"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span>{post.comments}</span>
                </button>
              </div>
              <button>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between py-3">
            <button 
              onClick={() => router.push('/dashboard')}
              className="text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <button className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button 
              onClick={handleLogout}
              className="text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </main>
  );
} 
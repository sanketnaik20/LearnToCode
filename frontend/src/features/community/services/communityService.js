import api from '../../../services/api';

export const communityService = {
    // Posts
    getPosts: async (params) => {
        const response = await api.get('/community/posts', { params });
        return response.data;
    },
    getPost: async (id) => {
        const response = await api.get(`/community/posts/${id}`);
        return response.data;
    },
    createPost: async (postData) => {
        const response = await api.post('/community/posts', postData);
        return response.data;
    },
    updatePost: async (id, postData) => {
        const response = await api.put(`/community/posts/${id}`, postData);
        return response.data;
    },
    deletePost: async (id) => {
        const response = await api.delete(`/community/posts/${id}`);
        return response.data;
    },
    votePost: async (id, voteType) => {
        const response = await api.post(`/community/posts/${id}/vote`, { voteType });
        return response.data;
    },

    // Comments
    getComments: async (postId) => {
        const response = await api.get(`/community/posts/${postId}/comments`);
        return response.data;
    },
    createComment: async (postId, commentData) => {
        const response = await api.post(`/community/posts/${postId}/comments`, commentData);
        return response.data;
    },
    voteComment: async (id, voteType) => {
        const response = await api.post(`/community/comments/${id}/vote`, { voteType });
        return response.data;
    }
};

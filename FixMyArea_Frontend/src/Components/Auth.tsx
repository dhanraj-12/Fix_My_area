import React from 'react';
import type { CodeResponse,  } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
    const navigate = useNavigate();
    const handleSuccess = async (response: CodeResponse) => {
        try {
            console.log('Auth Code Response:', response);
            if (response['code']) {
                const result = await axios.get(`http://localhost:3000/api/google?code=${response.code}`)
                console.log(result)

                if (!result.data || !result.data.user) {
                throw new Error('User data is missing from API response')
                }

                const { email, name, image } = result.data.user
                const token = result.data.token
                const obj = { email, name, token, image }
                localStorage.setItem('user-info', JSON.stringify(obj))
                navigate("/reportIssue")
            } else {
                console.log(response)
                throw new Error(response.code)
            }
        } catch (error) {
            console.error('Error handling success:', error);
        }
    };

    const handleError = (error: unknown) => {
        console.error('Google Login Error:', error);
    };

    const googleLogin = useGoogleLogin({
        onSuccess: handleSuccess,
        onError: handleError,
        flow: 'auth-code',
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Hi, this is Auth</h1>
            <button 
                className="w-fit flex items-center gap-3 bg-gray-700 border border-gray-600 text-gray-100 px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => googleLogin()}
            >
                <FcGoogle className="text-xl" />
                <span className="font-medium">Continue with Google</span>
            </button>
        </div>
    );
};

export default Auth;


import React, { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { Button } from '../ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface VerificationPageProps {
  email: string;
  onVerificationComplete: () => void;
  onBack: () => void;
}

export const VerificationPage: React.FC<VerificationPageProps> = ({
  email,
  onVerificationComplete,
  onBack,
}) => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async () => {
    if (code.length !== 6) return;
    
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      onVerificationComplete();
    }, 2000);
  };

  const handleResend = async () => {
    setIsResending(true);
    // Simulate resend process
    setTimeout(() => {
      setIsResending(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to sign up</span>
          </button>
          
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">
            Verify your email
          </h2>
          <p className="text-gray-400 mb-2">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-blue-400 font-medium mb-8">{email}</p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              value={code}
              onChange={setCode}
              maxLength={6}
              className="gap-2"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="w-12 h-12 text-lg font-semibold bg-gray-800 border-gray-700 text-white" />
                <InputOTPSlot index={1} className="w-12 h-12 text-lg font-semibold bg-gray-800 border-gray-700 text-white" />
                <InputOTPSlot index={2} className="w-12 h-12 text-lg font-semibold bg-gray-800 border-gray-700 text-white" />
                <InputOTPSlot index={3} className="w-12 h-12 text-lg font-semibold bg-gray-800 border-gray-700 text-white" />
                <InputOTPSlot index={4} className="w-12 h-12 text-lg font-semibold bg-gray-800 border-gray-700 text-white" />
                <InputOTPSlot index={5} className="w-12 h-12 text-lg font-semibold bg-gray-800 border-gray-700 text-white" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleVerify}
            disabled={code.length !== 6 || isVerifying}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium disabled:opacity-50"
          >
            {isVerifying ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Verifying...</span>
              </div>
            ) : (
              'Verify Email'
            )}
          </Button>

          <div className="text-center">
            <p className="text-gray-400 mb-2">Didn't receive the code?</p>
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors disabled:opacity-50"
            >
              {isResending ? 'Sending...' : 'Resend code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

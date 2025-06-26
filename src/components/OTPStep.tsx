// import React, { useState, useRef, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { ArrowLeft, Shield } from 'lucide-react';
// import OnboardingStep from './OnboardingStep';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
//   DialogClose
// } from '@/components/ui/dialog';

// interface OTPStepProps {
//   email: string;
//   onNext: () => void;
//   onBack: () => void;
// }

// const OTPStep: React.FC<OTPStepProps> = ({ email, onNext, onBack }) => {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [resendCooldown, setResendCooldown] = useState(0);
//   const [showBackConfirm, setShowBackConfirm] = useState(false);
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//   // Check if all OTP fields are filled
//   const isOtpComplete = otp.every(digit => digit !== '');

//   useEffect(() => {
//     if (resendCooldown > 0) {
//       const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [resendCooldown]);

//   const handleChange = (index: number, value: string) => {
//     if (value.length > 1) return;
    
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     setError('');

//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     const otpValue = otp.join('');
//     if (otpValue.length !== 6) {
//       setError('Please enter the complete 6-digit code');
//       return;
//     }

//     setIsLoading(true);
    
//     setTimeout(() => {
//       setIsLoading(false);
//       onNext();
//     }, 1000);
//   };

//   const handleResend = () => {
//     setResendCooldown(30);
//     setOtp(['', '', '', '', '', '']);
//     inputRefs.current[0]?.focus();
//   };

//   const handleBackClick = () => {
//     setShowBackConfirm(true);
//   };

//   const confirmBack = () => {
//     setShowBackConfirm(false);
//     onBack();
//   };

//   return (
//     <>
//       <OnboardingStep
//         title="Verify your email"
//         subtitle={`We've sent a 6-digit code to ${email.replace(/(.{2})(.*)(@.*)/, '$1***$3')}`}
//       >
//         <div className="flex justify-center mb-6">
//           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
//             <Shield className="h-8 w-8 text-gray-600" />
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex justify-center space-x-3">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={(el) => inputRefs.current[index] = el}
//                 type="text"
//                 inputMode="numeric"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleChange(index, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(index, e)}
//                 className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200"
//                 disabled={isLoading}
//               />
//             ))}
//           </div>

//           {error && (
//             <p className="text-red-500 text-sm text-center animate-fade-in">{error}</p>
//           )}

//           <div className="space-y-4">
//             <Button
//               type="submit"
//               className="w-full h-12 font-semibold bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
//               disabled={isLoading || !isOtpComplete} // Disabled when loading or OTP not complete
//             >
//               {isLoading ? (
//                 <div className="flex items-center space-x-2">
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   <span>Verifying...</span>
//                 </div>
//               ) : (
//                 'Verify Code'
//               )}
//             </Button>

//             <div className="text-center space-y-3">
//               <button
//                 type="button"
//                 onClick={handleResend}
//                 disabled={resendCooldown > 0}
//                 className="text-sm text-gray-500 hover:text-gray-700 transition-colors font-medium"
//               >
//                 {resendCooldown > 0 
//                   ? `Resend code in ${resendCooldown}s` 
//                   : 'Resend verification code'
//                 }
//               </button>

//               <button
//                 type="button"
//                 onClick={handleBackClick}
//                 className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors mx-auto"
//               >
//                 <ArrowLeft className="h-4 w-4" />
//                 <span>Back to email</span>
//               </button>
//             </div>
//           </div>
//         </form>
//       </OnboardingStep>

//       {/* Confirmation Dialog */}
//       <Dialog open={showBackConfirm} onOpenChange={setShowBackConfirm}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Change Email?</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to go back and change your email? Your current verification code will be invalidated.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>
//             <Button 
//               onClick={confirmBack}
//               className="bg-gray-900 hover:bg-gray-800"
//             >
//               Yes, Change Email
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default OTPStep;
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import OnboardingStep from './OnboardingStep';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';

interface OTPStepProps {
  email: string;
  onNext: () => void;
  onBack: () => void;
}

const OTPStep: React.FC<OTPStepProps> = ({ email, onNext, onBack }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isOtpComplete = otp.every(digit => digit !== '');

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isOtpComplete) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccess(true);
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setResendCooldown(30);
    setOtp(Array(6).fill(''));
    inputRefs.current[0]?.focus();
  };

  return (
    <>
      <OnboardingStep
        title="Verify your email"
        subtitle={`We've sent a 6-digit code to ${email.replace(/(.{2})(.*)(@.*)/, '$1***$3')}`}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-gray-600" />
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-medium border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                  disabled={isLoading}
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center animate-fade-in">
                {error}
              </p>
            )}

            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full h-12 font-semibold bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading || !isOtpComplete}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  'Verify Code'
                )}
              </Button>

              <div className="text-center space-y-3">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCooldown > 0}
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors font-medium disabled:opacity-50"
                >
                  {resendCooldown > 0 
                    ? `Resend code in ${resendCooldown}s` 
                    : 'Resend verification code'
                  }
                </button>

                <button
                  type="button"
                  onClick={() => setShowBackConfirm(true)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition-colors mx-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to email</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </OnboardingStep>

      <Dialog open={showBackConfirm} onOpenChange={setShowBackConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Email?</DialogTitle>
            <DialogDescription>
              Going back will invalidate your current verification code.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={onBack}
              className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="text-center">
          <div className="mx-auto flex flex-col items-center gap-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <DialogHeader>
              <DialogTitle>Verification Successful!</DialogTitle>
              <DialogDescription>
                Your email has been successfully verified.
              </DialogDescription>
            </DialogHeader>
            <Button 
              onClick={onNext}
              className="w-full bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OTPStep;
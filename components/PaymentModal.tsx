import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle } from 'lucide-react';

interface PaymentModalProps {
  providerName: string;
  onClose: () => void;
  onSuccess: (amount: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ providerName, onClose, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setStep('success');
    
    // Auto close after success
    setTimeout(() => {
      onSuccess(amount);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {step === 'form' ? (
          <>
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Lock size={16} className="text-green-600" />
                  Pago Seguro
                </h3>
                <p className="text-xs text-gray-500">Contratando a {providerName}</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto Acordado ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                  <input
                    type="number"
                    required
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-7 block w-full rounded-lg border-gray-300 border py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Tarjeta</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="0000 0000 0000 0000"
                    className="pl-10 block w-full rounded-lg border-gray-300 border py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vencimiento</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/AA"
                    className="block w-full rounded-lg border-gray-300 border py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input
                    type="text"
                    required
                    placeholder="123"
                    className="block w-full rounded-lg border-gray-300 border py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Procesando...
                    </>
                  ) : (
                    'Pagar Ahora'
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                  <Lock size={10} />
                  Tus datos están encriptados de extremo a extremo.
                </p>
              </div>
            </form>
          </>
        ) : (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h3>
            <p className="text-gray-500">
              Se ha enviado el pago de ${amount} a {providerName}.
              <br/>Recibirás una notificación con el comprobante.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

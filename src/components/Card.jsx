import React from 'react';
import { motion } from "framer-motion";
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarDaysIcon, 
  UserCircleIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { format, isValid } from 'date-fns';

export default function Card() {
  const { allMessages } = useSelector((state) => state.Messages);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isValid(date) ? format(date, 'PPP') : 'Date not available';
    } catch (error) {
      return 'Date not available';
    }
  };

  if (!allMessages) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-pulse text-blue-400 font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center min-h-screen w-full bg-gray-900 p-4'>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-3xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden'
      >
        {allMessages.map((message, index) => (
            
          <motion.div 
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-gray-700 last:border-b-0 "
          >
            <div className="p-6 space-y-4">
              {/* Header with name and date */}
              <div className="flex justify-between items-start">
                
                <motion.div 
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  className="flex items-center space-x-3"
                >
                  <UserCircleIcon className="w-10 h-10 text-blue-400" />
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {message.firstName || 'N/A'} {message.lastName || ''}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {formatDate(message.createdAt)}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-2 text-gray-300"
                >
                  <EnvelopeIcon className="w-5 h-5 text-blue-400" />
                  <span>{message.mail || 'Email not available'}</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-2 text-gray-300"
                >
                  <PhoneIcon className="w-5 h-5 text-blue-400" />
                  <span>{message.phoneNumber || 'Phone not available'}</span>
                </motion.div>
              </div>

              {/* Description */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4"
              >
                <div className="flex items-start space-x-2">
                  <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-blue-400 mt-1" />
                  <p className="text-gray-300 leading-relaxed">
                    {message.discription || 'No description available'}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

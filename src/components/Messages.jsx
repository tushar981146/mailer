import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { EnvelopeIcon, TagIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMailData } from '../store/allDataSlice';
import { listNames } from "../store/listNameSlice";
import { allMessagesFetch } from '../store/allMessagesSlice';
import { useNavigate } from 'react-router-dom';

export default function Messages() {
   const dispatch = useDispatch();
   const Navigate = useNavigate();
   
   useEffect(() => {
      dispatch(fetchMailData());
      dispatch(listNames());
      dispatch(allMessagesFetch());  
   }, [dispatch]);

   const { allDataIsLoading, Alldata } = useSelector((state) => state.allData);
   const { listNameIsLoading, uniqueName } = useSelector((state) => state.storeListName);

   const { allMessages } = useSelector((state) => state.Messages);

   if(allMessages) {
      console.log("All Messages fetched: ", allMessages);
      
   }

   if(listNameIsLoading || !uniqueName) {
      return (
         <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="animate-pulse text-blue-400 font-semibold">Loading...</div>
         </div>
      )     
   }

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1
      }
    };

   return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 bg-gray-900 h-screen overflow-auto"
      >
         <motion.nav 
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="bg-gray-800 shadow-xl px-6 py-4 sticky top-0"
         >
            <div className="flex items-center space-x-2 flex-wrap">
               {allMessages && allMessages.map((item, index) => (
                  <motion.div 
                     key={index}
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     whileHover={{ scale: 1.05 }}
                     className="bg-gray-700 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-gray-600 flex items-center gap-1"
                  >
                     <TagIcon className="w-4 h-4" />
                     {item.firstName}
                  </motion.div>
               ))}
            </div>
         </motion.nav>

         <motion.div 
            className="p-6 cursor-pointer"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
         >
            {allMessages && allMessages.map((email, index) => (
               <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  className="mb-4 p-4 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-750 transition-colors duration-200"
                  onClick={() => Navigate(`/messages`)}
               >
                  <div className="flex items-start gap-3">
                     <EnvelopeIcon className="w-6 h-6 text-blue-400 mt-1" />
                     <div>
                        <h3 className="text-gray-200 font-medium">{email.mail}</h3>
                        <p className="text-gray-400 mt-2">{email.firstName}</p>
                     </div>
                  </div>
               </motion.div>
            ))}
         </motion.div>
      </motion.div>
   )
}

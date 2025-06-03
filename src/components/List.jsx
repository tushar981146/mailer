import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Bars3Icon, 
  XMarkIcon, 
  InboxIcon, 
  EnvelopeIcon,
  StarIcon 
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from "react-redux";
import { listNames, uniqueName } from "../store/listNameSlice"
import { allMessagesFetch } from "../store/allMessagesSlice";

const List = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listNames());
  }, [dispatch]);

  const { listNameIsLoading, listName, listNameError } = useSelector((state) => state.storeListName);
  
  if(listNameIsLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-pulse text-blue-400 font-semibold">Loading...</div>
      </div>
    );
  }

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar for PC */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="hidden md:flex w-72 bg-gray-800 shadow-xl text-gray-100 flex-col"
      >
        <div className="p-4 bg-blue-600 text-white">
          <motion.h2 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-xl font-bold flex items-center gap-2"
          >
            <EnvelopeIcon className="w-6 h-6" />
            Mail
          </motion.h2>
        </div>
        <div className="p-4">
          <motion.ul 
            className="space-y-1"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            {!listNameIsLoading && listName.map((item, index) => (
              <motion.li 
                key={index}
                variants={listItemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-150 cursor-pointer flex items-center text-gray-300 hover:text-blue-400"
                onClick={() => dispatch(allMessagesFetch(item))}
              >
                {index % 2 === 0 ? (
                  <InboxIcon className="w-5 h-5 mr-3 text-gray-500" />
                ) : (
                  <StarIcon className="w-5 h-5 mr-3 text-gray-500" />
                )}
                {Object.keys(item)[0]}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed top-0 left-0 h-full w-72 bg-gray-800 shadow-xl md:hidden z-10"
      >
        <div className="p-4 bg-blue-600 text-white">
          <h2 className="text-xl font-bold">Mail</h2>
        </div>
        <div className="p-4">
          <ul className="space-y-1">
            {!listNameIsLoading && listName.map((item, index) => (
              <li 
                key={index} 
                className="px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-150 cursor-pointer flex items-center text-white hover:text-blue-400"
                onClick={() => dispatch(allMessagesFetch(item))}
              >
                <span className="material-icons mr-3 text-gray-500">mail</span>
                {Object.keys(item)[0]}
                
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Mobile Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-lg bg-gray-800 shadow-lg hover:bg-gray-700 opacity-25"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-300 opacity-50"  />
        ) : (
          <Bars3Icon className="w-6 h-6 text-gray-300" />
        )}
      </motion.button>
    </div>
  );
};

export default List;

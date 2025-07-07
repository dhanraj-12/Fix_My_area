const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Issue Submitted Successfully 🎉</h2>
          <p className="text-gray-600 mb-6">Thank you for reporting the issue. Our team will look into it shortly.</p>
          <button
            onClick={onClose}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  export default SuccessModal
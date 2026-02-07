import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { AlgarveGuide } from '../components/pdf/AlgarveGuide';
import { useGuideData } from '../hooks/useGuideData';

const GuidePreview: React.FC = () => {
  const { data, loading, error } = useGuideData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading guide data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Error Loading Guide</h1>
          <p className="text-gray-600 mb-4">{error?.message || 'Unable to load guide data'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-teal-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">The Algarve Secret Guide — Preview</h1>
          <div className="flex gap-4 items-center">
            <span className="text-sm bg-teal-700 px-2 py-1 rounded">
              {data.beaches.length} beaches | {data.restaurants.length} restaurants | {data.towns.length} towns
            </span>
            <a
              href="/guide/download"
              className="bg-white text-teal-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Download Page
            </a>
          </div>
        </div>
      </div>
      <PDFViewer style={{ width: '100%', height: 'calc(100vh - 64px)' }}>
        <AlgarveGuide data={data} />
      </PDFViewer>
    </div>
  );
};

export default GuidePreview;

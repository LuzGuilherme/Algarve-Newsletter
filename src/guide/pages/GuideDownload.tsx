import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { AlgarveGuide } from '../components/pdf/AlgarveGuide';
import { useGuideData } from '../hooks/useGuideData';

const GuideDownload: React.FC = () => {
  const { data, loading, error } = useGuideData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Preparing your guide...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-white">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Error Loading Guide</h1>
          <p className="text-gray-600">{error?.message || 'Unable to load guide data'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-teal-700 mb-3">The Algarve Secret Guide</h1>
          <p className="text-xl text-gray-600">
            The places tourists miss and locals actually go
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">What's Inside:</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• {data.beaches.length} hand-picked beaches</li>
                <li>• {data.restaurants.length} local restaurants</li>
                <li>• {data.towns.length} towns by vibe</li>
                <li>• {data.traps.length} tourist traps to skip</li>
                <li>• {data.dayTrips.length} curated day trips</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Plus:</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Monthly timing guide</li>
                <li>• Insider timing hacks</li>
                <li>• Useful Portuguese phrases</li>
                <li>• GPS coordinates for everything</li>
                <li>• Emergency contacts</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-6">
            <p className="text-sm text-gray-500 text-center mb-6">
              Version {data.config.version} • Updated {data.config.lastUpdated}
            </p>

            <PDFDownloadLink
              document={<AlgarveGuide data={data} />}
              fileName={`algarve-secret-guide-v${data.config.version}.pdf`}
              className="block w-full bg-teal-600 hover:bg-teal-700 text-white text-center py-4 px-8 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl"
            >
              {({ blob, url, loading: pdfLoading, error: pdfError }) =>
                pdfLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating PDF...
                  </span>
                ) : (
                  'Download Your Free Guide (PDF)'
                )
              }
            </PDFDownloadLink>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/guide/preview"
            className="text-teal-600 hover:text-teal-700 underline"
          >
            Preview the guide in your browser
          </a>
          <span className="text-gray-400 mx-3">•</span>
          <a
            href="/"
            className="text-teal-600 hover:text-teal-700 underline"
          >
            Back to homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default GuideDownload;

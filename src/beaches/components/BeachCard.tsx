import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Waves, Camera, Users, Car, Video } from 'lucide-react';
import { Beach } from '../types';

interface BeachCardProps {
  beach: Beach;
}

const activityIcons: Record<string, React.ReactNode> = {
  swimming: <Waves className="w-3.5 h-3.5" />,
  surfing: <Waves className="w-3.5 h-3.5" />,
  photography: <Camera className="w-3.5 h-3.5" />,
  snorkeling: <Waves className="w-3.5 h-3.5" />,
  kayaking: <Waves className="w-3.5 h-3.5" />,
};

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-100 text-green-700',
  moderate: 'bg-yellow-100 text-yellow-700',
  challenging: 'bg-red-100 text-red-700',
};

const crowdLabels: Record<string, string> = {
  busy: 'Busy',
  moderate: 'Moderate crowds',
  quiet: 'Quiet',
  secluded: 'Secluded',
};

const BeachCard: React.FC<BeachCardProps> = ({ beach }) => {
  return (
    <Link
      to={`/beaches/${beach.slug}`}
      className="group block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={beach.image}
          alt={beach.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800';
          }}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {beach.features.includes('hidden-gem') && (
            <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Hidden Gem
            </span>
          )}
          {beach.webcam?.available && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Video className="w-3 h-3" />
              Live Cam
            </span>
          )}
        </div>

        {/* Difficulty badge */}
        <span className={`absolute bottom-4 right-4 text-xs font-bold px-3 py-1 rounded-full capitalize ${difficultyColors[beach.difficulty]}`}>
          {beach.difficulty} access
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Location */}
        <div className="flex items-center gap-1 text-slate-400 text-sm mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>{beach.nearestTown} &bull; {beach.distanceFromTown}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">
          {beach.name}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">
          {beach.description}
        </p>

        {/* Activities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {beach.activities.slice(0, 4).map(activity => (
            <span
              key={activity}
              className="flex items-center gap-1 text-xs font-medium text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full capitalize"
            >
              {activityIcons[activity] || null}
              {activity.replace(/-/g, ' ')}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {crowdLabels[beach.crowdLevel]}
          </span>
          {beach.features.includes('parking') && (
            <span className="flex items-center gap-1">
              <Car className="w-3.5 h-3.5" />
              Parking
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BeachCard;

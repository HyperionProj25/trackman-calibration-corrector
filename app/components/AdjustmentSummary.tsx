import React from 'react';
import { Info } from 'lucide-react';

interface AdjustmentSummaryProps {
  setupDistance: number;
  actualDistance: number;
  setupSide: number;
  actualSide: number;
  setupHeight: number;
  actualHeight: number;
}

export function AdjustmentSummary({
  setupDistance,
  actualDistance,
  setupSide,
  actualSide,
  setupHeight,
  actualHeight,
}: AdjustmentSummaryProps) {
  // Calculate dynamic correction factors based on user's setup parameters
  const distanceRatio = actualDistance / setupDistance;
  const heightDifference = actualHeight - setupHeight;
  const sideDifference = actualSide - setupSide;

  // Reference case: 13ft → 25ft (ratio 1.923), height +0.5ft, side -6ft
  const referenceDistanceRatio = 25 / 13; // 1.923

  // Reference correction factors from the 13ft→25ft calibration study
  const referenceFactors = {
    height: { scale: 1.082, avgCorrect: 2.317, avgMiscal: 2.415 },
    side: { scale: 0.982, avgCorrect: 0.058, avgMiscal: -0.125 }
  };

  // Calculate dynamic correction factors based on user's setup vs reference
  const distanceScaling = distanceRatio / referenceDistanceRatio;

  // Interpolate/extrapolate correction factors based on setup differences
  const heightScaleAdjustment = 1 + (distanceScaling - 1) * 0.5; // Moderate scaling with distance
  const sideScaleAdjustment = 1 + (distanceScaling - 1) * 0.3;   // Less scaling for side measurements

  const correctionFactors = {
    height: {
      scale: referenceFactors.height.scale * heightScaleAdjustment,
      avgCorrect: referenceFactors.height.avgCorrect + (heightDifference * 0.1),
      avgMiscal: referenceFactors.height.avgMiscal + (heightDifference * 0.1)
    },
    side: {
      scale: referenceFactors.side.scale * sideScaleAdjustment,
      avgCorrect: referenceFactors.side.avgCorrect + (sideDifference * 0.05),
      avgMiscal: referenceFactors.side.avgMiscal + (sideDifference * 0.05)
    }
  };

  // Calculate setup differences for display
  const distanceChange = actualDistance - setupDistance;
  const lateralChange = actualSide - setupSide;
  const heightChange = actualHeight - setupHeight;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Info className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-blue-900">Adjustment Summary</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Setup Change</h4>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {distanceChange >= 0 ? '+' : ''}{distanceChange.toFixed(1)}ft
          </div>
          <p className="text-sm text-gray-600">
            {setupDistance}ft → {actualDistance}ft
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Distance difference from calibration
          </p>
        </div>

        <div className="bg-white rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Height Correction</h4>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {correctionFactors.height.scale.toFixed(3)}x
          </div>
          <p className="text-sm text-gray-600">
            Statistical scale factor
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Distribution matching correction
          </p>
        </div>

        <div className="bg-white rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Side Correction</h4>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {correctionFactors.side.scale.toFixed(3)}x
          </div>
          <p className="text-sm text-gray-600">
            Statistical scale factor
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Distribution matching correction
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-100 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Statistical Correction Formula:</strong> Corrected Value = (Original - MiscalAvg) × Scale + CorrectAvg
        </p>
        <p className="text-xs text-blue-700 mt-1">
          Calibrated for 13ft→25ft distance change. Uses distribution matching instead of geometric scaling.
        </p>
      </div>
    </div>
  );
}

import React from 'react';

interface CalibrationInputsProps {
  setupDistance: number;
  setSetupDistance: (value: number) => void;
  actualDistance: number;
  setActualDistance: (value: number) => void;
  setupSide: number;
  setSetupSide: (value: number) => void;
  actualSide: number;
  setActualSide: (value: number) => void;
  setupHeight: number;
  setSetupHeight: (value: number) => void;
  actualHeight: number;
  setActualHeight: (value: number) => void;
}

export function CalibrationInputs({
  setupDistance,
  setSetupDistance,
  actualDistance,
  setActualDistance,
  setupSide,
  setSetupSide,
  actualSide,
  setActualSide,
  setupHeight,
  setSetupHeight,
  actualHeight,
  setActualHeight,
}: CalibrationInputsProps) {
  const handleNumberInput = (value: string, setter: (value: number) => void) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setter(numValue);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Calibration Parameters</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Distance Parameters */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700 border-b border-gray-200 pb-2">
            Distance (feet)
          </h3>
          <div>
            <label htmlFor="setupDistance" className="block text-sm font-medium text-gray-700 mb-1">
              Setup Distance
            </label>
            <input
              type="number"
              id="setupDistance"
              value={setupDistance}
              onChange={(e) => handleNumberInput(e.target.value, setSetupDistance)}
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="13"
            />
            <p className="text-xs text-gray-500 mt-1">Original calibrated distance from home plate</p>
          </div>
          <div>
            <label htmlFor="actualDistance" className="block text-sm font-medium text-gray-700 mb-1">
              Actual Distance
            </label>
            <input
              type="number"
              id="actualDistance"
              value={actualDistance}
              onChange={(e) => handleNumberInput(e.target.value, setActualDistance)}
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="25"
            />
            <p className="text-xs text-gray-500 mt-1">Real distance during data collection</p>
          </div>
        </div>

        {/* Side Position Parameters */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700 border-b border-gray-200 pb-2">
            Side Position (feet)
          </h3>
          <div>
            <label htmlFor="setupSide" className="block text-sm font-medium text-gray-700 mb-1">
              Setup Side Position
            </label>
            <input
              type="number"
              id="setupSide"
              value={setupSide}
              onChange={(e) => handleNumberInput(e.target.value, setSetupSide)}
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="2.5"
            />
            <p className="text-xs text-gray-500 mt-1">Original calibrated lateral offset (+ = right)</p>
          </div>
          <div>
            <label htmlFor="actualSide" className="block text-sm font-medium text-gray-700 mb-1">
              Actual Side Position
            </label>
            <input
              type="number"
              id="actualSide"
              value={actualSide}
              onChange={(e) => handleNumberInput(e.target.value, setActualSide)}
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="-3.5"
            />
            <p className="text-xs text-gray-500 mt-1">Real lateral position during collection (+ = right)</p>
          </div>
        </div>

        {/* Height Parameters */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700 border-b border-gray-200 pb-2">
            Height (feet)
          </h3>
          <div>
            <label htmlFor="setupHeight" className="block text-sm font-medium text-gray-700 mb-1">
              Setup Height
            </label>
            <input
              type="number"
              id="setupHeight"
              value={setupHeight}
              onChange={(e) => handleNumberInput(e.target.value, setSetupHeight)}
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="8.5"
            />
            <p className="text-xs text-gray-500 mt-1">Original calibrated height</p>
          </div>
          <div>
            <label htmlFor="actualHeight" className="block text-sm font-medium text-gray-700 mb-1">
              Actual Height
            </label>
            <input
              type="number"
              id="actualHeight"
              value={actualHeight}
              onChange={(e) => handleNumberInput(e.target.value, setActualHeight)}
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="9"
            />
            <p className="text-xs text-gray-500 mt-1">Real height during collection</p>
          </div>
        </div>
      </div>
    </div>
  );
}

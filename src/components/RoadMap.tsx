'use client';

import { useState, useRef, useEffect } from 'react';
import mockData from '../../data/mockdata.json';

interface MockData {
  bootcampName: string;
  progress: number;
  currentDay: number;
  taskCount: number;
  bootcampContent: Array<{
    title: string;
    subtitle: string;
    nodes: Array<{
      day: number;
      content: string;
      description: string;
    }>;
  }>;
}

const data: MockData = mockData;

export default function RoadMap() {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  // Calculate progress
  const totalTasks = data.taskCount;
  const completedTasks = data.progress;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{data.bootcampName}</h2>
        <p className="text-gray-600">Klicke auf einen Tag für mehr Details</p>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Fortschritt</span>
          <span className="text-sm font-medium text-gray-700">
            {completedTasks} von {totalTasks} Aufgaben erledigt
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#4B2E83] transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Weeks and Days */}
      <div className="space-y-16">
        {data.bootcampContent.map((week, weekIndex) => (
          <div key={weekIndex} className="relative min-h-[20vh] flex items-center">
            <div className="grid grid-cols-5 gap-8 w-full">
              {week.nodes.map((node) => (
                <div key={node.day} className="relative h-48">
                  <button
                    className={`w-full h-full transition-all ${
                      selectedNode === node.day ? 'scale-105' : ''
                    }`}
                    onClick={() => setSelectedNode(selectedNode === node.day ? null : node.day)}
                  >
                    <div
                      className={`h-full p-4 rounded-lg border-2 transition-all flex flex-col ${
                        node.day === data.currentDay
                          ? 'border-[#4B2E83] bg-[#4B2E83] text-white'
                          : node.day < data.currentDay
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="text-lg font-semibold mb-2">Tag {node.day}</div>
                      <h3 className="font-medium mb-1">{node.content}</h3>
                      {selectedNode === node.day && (
                        <div className="mt-auto space-y-2">
                          <p className={`text-sm ${
                            node.day === data.currentDay ? 'text-gray-100' : 'text-gray-500'
                          }`}>
                            {node.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
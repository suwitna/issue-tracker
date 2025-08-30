// models/MachineLog.ts
import mongoose, { Schema, Document } from 'mongoose';

export type MachineStatus = 'running' | 'stop' | 'idle' | 'off';

export interface IMachineLogBlock {
  start: string;   // '08:00'
  end: string;     // '09:30'
  status: MachineStatus;
  duration?: string;
}

export interface IMachineLog extends Document {
  machine: string; // e.g. "CNC-MACHINE-001"
  timeline: IMachineLogBlock[];
}

// Block schema (for timeline[])
const TimelineBlockSchema = new Schema<IMachineLogBlock>({
  start: { type: String, required: true },
  end: { type: String, required: true },
  status: {
    type: String,
    enum: ['running', 'stop', 'idle', 'off'],
    required: true,
  },
  duration: { type: String },
});

// Main machine log schema
const MachineLogSchema = new Schema<IMachineLog>({
  machine: { type: String, required: true },
  timeline: { type: [TimelineBlockSchema], required: true },
});

export default mongoose.models.MachineLog ||
  mongoose.model<IMachineLog>('MachineLog', MachineLogSchema);

export type Classroom = {
  _id?: string;
  num: string;
  capacity: number;
  available: boolean;
};

// create-request-classroom.dto.ts
export interface CreateRequestClassroomDto {
  startDateTime: Date;
  endDateTime: Date;
  roomId: string;
  requestedBy: string;
  reason: string;
  status?: string;
  num?: string;
}

// update-request-classroom.dto.ts
export interface UpdateRequestClassroomDto {
  startDateTime?: Date;
  endDateTime?: Date;
  roomId?: string;
  requestedBy?: string;
  reason?: string;
  status?: string;
}

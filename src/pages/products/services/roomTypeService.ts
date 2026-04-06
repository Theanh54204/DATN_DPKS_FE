export interface RoomTypeL {
  room_type_id: number;
  name: string;
  capacity: number;
  bed_type: string;
  area: number;
  amenities: string[];
  base_price: string;
  currency: string;
<<<<<<< HEAD
  available_rooms: number; // Số phòng trống
  total_rooms: number;     // Tổng số phòng
  images: string[];        // Mảng các đường dẫn ảnh
  max_adults: number;    // Số người lớn tối đa
  max_children: number;  // Số trẻ em tối đa
  services: any[];      // Danh sách dịch vụ đi kèm
=======
  available_rooms: number;
  total_rooms: number;
  images: string[];
  max_adults: number;
  max_children: number;
  services: any[];
}

export interface SearchInfo {
  check_in: string;
  check_out: string;
  nights: number;
  adults: number;
  children: number;
  total_guests: number;
  required_capacity: number;
  quantity_rooms: number;
}

export interface SearchRoomRequest {
  check_in: string;
  check_out: string;
  adults: number;
  children_ages: number[];
  quantity_rooms: number;
  name?: string;
}

interface SearchRoomTypeRaw {
  room_type_id: number;
  name: string;
  capacity_per_room: number;
  available_rooms: number;
  bed_type: string;
  area: number;
  amenities: string[];
  price_per_room_per_night: string;
  nights: number;
  total_price: number;
  currency: string;
  images: string[];
}

function mapToRoomTypeL(r: SearchRoomTypeRaw): RoomTypeL {
  return {
    room_type_id: r.room_type_id,
    name: r.name,
    capacity: r.capacity_per_room,
    bed_type: r.bed_type,
    area: r.area,
    amenities: r.amenities,
    base_price: r.price_per_room_per_night,
    currency: r.currency,
    available_rooms: r.available_rooms,
    total_rooms: r.available_rooms,
    images: r.images,
    max_adults: r.capacity_per_room,
    max_children: 0,
    services: [],
  };
>>>>>>> 79f952a3dd6fee4936b6154f54af1f9aba4bbc32
}

export const roomService = {
  getRoomTypes: async (): Promise<RoomTypeL[]> => {
    try {
      const response = await fetch('https://vietstay.ngrok.dev/api/rooms/room-types');
      if (!response.ok) throw new Error('Không thể kết nối API');
      const result = await response.json();
      return result.room_types || [];
    } catch (error) {
      console.error("Service Error:", error);
      return [];
    }
  }
};

export async function searchRoomTypes(
  params: SearchRoomRequest
): Promise<{ rooms: RoomTypeL[]; searchInfo: SearchInfo }> {
  const response = await fetch('https://vietstay.ngrok.dev/api/rooms/room-types/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!response.ok) throw new Error('Không thể tìm kiếm phòng');
  const result = await response.json();
  return {
    rooms: (result.room_types || []).map(mapToRoomTypeL),
    searchInfo: result.search_info,
  };
}
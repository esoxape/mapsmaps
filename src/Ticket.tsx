export class Ticket {
    lat: number;
    long: number;
    type: string;
  
    static tickets: Ticket[] = Ticket.generateRandomTickets(1000);
  
    constructor(lat: number, long: number, type: string) {
      this.lat = lat;
      this.long = long;
      this.type = type;
    }
  
    static generateRandomTickets(count: number): Ticket[] {
      const types = ["varmt", "kallt", "diskmaskin"];
      let tickets: Ticket[] = [];
  
      for (let i = 0; i < count; i++) {
        let lat = Math.random() * (58 - 56) + 56; // Generate a random latitude within specified range
        let long = Math.random() * (16 - 14) + 14; // Generate a random longitude within specified range
        let type = types[Math.floor(Math.random() * types.length)]; // Pick a random type
        tickets.push(new Ticket(lat, long, type));
      }
  
      return tickets;
    }
  }
  
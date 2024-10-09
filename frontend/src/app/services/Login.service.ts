import { Injectable } from "@angular/core";
import { API_URL } from "../env";

@Injectable()
export class LoginService {
  async login(password: string): Promise<boolean> {
    let response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password }),
    });

    let body = await response.json();
    return body.success;
  }
}

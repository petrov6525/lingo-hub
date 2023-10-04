import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Dictionary {
    id: number;
    name: string;
    // Add other properties as needed
}

interface Word {
    id: number;
    origin: string;
    translate: string;
    // Add other properties as needed
}

@Component({
    selector: 'app-dictionaries-list',
    templateUrl: './dictionaries-list.component.html',
    styleUrls: ['./dictionaries-list.component.css'],
})
export class DictionariesListComponent implements OnInit {
    dictionaries: Dictionary[] = [];
    words: Word[] = []; // Property to hold word data

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            const userId = currentUser.id;
            const authToken = 'sirh545dff4e5f4ffkfjhe';

            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'auth-token': authToken,
            });

            // Fetch dictionaries data based on the user ID
            this.http
                .get<Dictionary[]>(`http://localhost:8081/dictionary/all/${userId}`, { headers })
                .subscribe(
                    (data) => {
                        // Handle the data received from the API
                        this.dictionaries = data; // Assign the fetched data to the 'dictionaries' array

                        // Fetch word data for the first dictionary on component initialization
                        if (this.dictionaries.length > 0) {
                            this.fetchAndDisplayWords(this.dictionaries[0].id);
                        }
                    },
                    (error) => {
                        // Handle any errors
                        console.error('Error fetching dictionaries:', error);
                    }
                );
        } else {
            // Handle the case when 'currentUser' is null
        }
    }

    // Rest of the component code remains the same

    // New method to fetch and display word data
    fetchAndDisplayWords(dictionaryId: number) {
        // Define the headers with the 'auth-token' key and value
        const headers = new HttpHeaders({
            'auth-token': 'sirh545dff4e5f4ffkfjhe',
        });

        // Use the dictionaryId to fetch word data with the headers
        this.http
            .get<Word[]>(`http://localhost:8081/word/all/${dictionaryId}`, { headers })
            .subscribe(
                (data) => {
                    // Assign the fetched word data to the 'words' array
                    this.words = data;
                },
                (error) => {
                    // Handle any errors
                    console.error('Error fetching words:', error);
                    // Reset the 'words' array in case of an error
                    this.words = [];
                }
            );
    }
}

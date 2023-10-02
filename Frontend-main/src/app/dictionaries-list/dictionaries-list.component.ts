import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Answer {
    name: string;
    isCorrect: boolean;
}

@Component({
    selector: 'app-dictionaries-list',
    templateUrl: './dictionaries-list.component.html',
    styleUrls: ['./dictionaries-list.component.css'],
})
export class DictionariesListComponent implements OnInit {
    dictionaries: any[] = [];
    timerMinutes: number = 1;
    timerSeconds: number = 0;
    timerInterval: any;
    quizSubmitted: boolean = false;
    questions: any[] = [
        {
            question: 'Question 1?',
            answers: [
                { name: 'Answer 1 true', isCorrect: true },
                { name: 'Answer 2 false', isCorrect: false },
                { name: 'Answer 3 false', isCorrect: false },
                { name: 'Answer 4 false', isCorrect: false },
            ] as Answer[], // Define the type for answers
        },
        {
            question: 'Question 2?',
            answers: [
                { name: 'Answer 1 false', isCorrect: false },
                { name: 'Answer 2 true', isCorrect: true },
                { name: 'Answer 3 false', isCorrect: false },
                { name: 'Answer 4 false', isCorrect: false },
            ] as Answer[], // Define the type for answers
        },
        // Add more questions here
    ];

    currentQuestionIndex: number = 0; // Start with the first question
    showSubmitButton: boolean = false; // Initially, hide the "Submit" button
    userAnswers: string[] = [];
    selectedAnswer: Answer | null = null;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router // Inject Router
    ) {
        this.selectedAnswer = null; // Initialize selectedAnswer with null or an appropriate default value
    }
    onNextClick() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            // If it's not the last question, increment the index
            this.currentQuestionIndex++;
        } else {
            // If it's the last question, submit the answers and calculate the score
            this.onSubmit();
        }
    }
    checkAnswer() {
        if (this.selectedAnswer && this.selectedAnswer.isCorrect) {
            // Handle correct answer (e.g., increment score)
        }

        // Increment the currentQuestionIndex
        this.currentQuestionIndex++;

        if (this.currentQuestionIndex === this.questions.length) {
            // If it's the last question, show the "Submit" button
            this.showSubmitButton = true;
        }
    }
    clearDictionaryContainer(correct: number, totalQuestions: number) {
        // Find the dictionary_container element
        const dictionaryContainer = document.querySelector('.dictionary_container');

        if (dictionaryContainer) {
            // Remove all child nodes except for the elements to keep
            const elementsToRemove = Array.from(dictionaryContainer.children).filter(
                (element) =>
                    element !== dictionaryContainer.querySelector('.top_d_container') &&
                    element !== dictionaryContainer.querySelector('h2.d_container_h2')
            );

            elementsToRemove.forEach((element) => {
                dictionaryContainer.removeChild(element);
            });

            // Update the text of the h1 element to display the score
            const h1Element = dictionaryContainer.querySelector('h1.d_container_h1');
            if (h1Element) {
                h1Element.textContent = `Score: ${correct}/${totalQuestions}`;
            }
        }
    }
    onSubmit() {
        let score = 0;

        for (let i = 0; i < this.questions.length; i++) {
            const selectedAnswerIndex = this.questions[i].answers.findIndex((answer: Answer) => answer.name === this.userAnswers[i]);
            const correctAnswerIndex = this.questions[i].answers.findIndex((answer: Answer) => answer.isCorrect);

            if (selectedAnswerIndex === correctAnswerIndex) {
                score++;
            }
        }

        // Display the score to the user or handle it as needed
        console.log('Your score:', score);
        clearInterval(this.timerInterval);
        this.clearDictionaryContainer(score, this.questions.length);
        // You can also reset the currentQuestionIndex and userAnswers here if needed.
    }
    startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.timerMinutes === 0 && this.timerSeconds === 0) {
                // Timer has reached 0:00, you can handle this case as needed
                clearInterval(this.timerInterval); // Stop the timer
            } else {
                if (this.timerSeconds === 0) {
                    // Decrease minutes and reset seconds
                    this.timerMinutes--;
                    this.timerSeconds = 59;
                } else {
                    // Decrease seconds
                    this.timerSeconds--;
                }
            }
        }, 1000); // Update the timer every 1000ms (1 second)
    }
    ngOnInit() {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            const userId = currentUser.id;
            const authToken = 'sirh545dff4e5f4ffkfjhe';

            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'auth-token': authToken
            });

            this.http.get(`http://localhost:8081/dictionary/all/${userId}`, { headers }).subscribe(
                (data: Object) => {
                    // Handle the data received from the API
                    this.dictionaries = data as any[]; // Assign the fetched data to the 'dictionaries' array

                    // Get the current URL segment
                    const currentUrlSegment = this.route.snapshot.url[1].path;

                    // Decode the URL segment if needed
                    const decodedDictionaryName = currentUrlSegment.replace('_', ' '); // Replace "_" with space if necessary

                    // Iterate through dictionaries to determine which one is active
                    for (const dictionary of this.dictionaries) {
                        if (dictionary.name === decodedDictionaryName) {
                            // Mark the dictionary as active
                            dictionary.active = true;
                        } else {
                            // Remove the active flag from other dictionaries
                            dictionary.active = false;
                        }
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
        this.startTimer();
    }
    redirectToDictionary(dictionaryName: string) {
        // Encode the dictionaryName, replacing spaces with underscores
        const formattedDictionaryName = dictionaryName.replace(/\s+/g, '_');

        // Build the URL for the dictionary page
        const dictionaryUrl = `/dictionaries/${formattedDictionaryName}`;

        // Use the Router to navigate to the URL
        this.router.navigateByUrl(dictionaryUrl).then(() => {
            // Reload the page after navigation
            window.location.reload();
        });
    }
}

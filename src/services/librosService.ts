import { BOOK_KEY } from "@/constants/constants";
import { Libro } from "@/interface/interface";

export function getBooks(){
    const books: Libro[] = JSON.parse(localStorage.getItem(BOOK_KEY) ?? '[]')
    console.log(books)
    return books
}

export function setBooks(books: Libro[]){
    localStorage.setItem(BOOK_KEY, JSON.stringify(books))
}
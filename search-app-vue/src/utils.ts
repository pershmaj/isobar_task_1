const noposter = '/images/no-poster.jpg';

export function getPoster(moviePoster: string) {
    return moviePoster && moviePoster !== 'N/A'  
        ? moviePoster 
        : noposter;
}
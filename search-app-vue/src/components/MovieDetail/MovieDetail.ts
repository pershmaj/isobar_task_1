import api from "@/api";
import { Movie, MovieDetail } from "@/interfaces";
import { getPoster } from "@/utils";
import { defineComponent, watch } from "@vue/runtime-core";
import axios from "axios";
import { ref } from "vue";


export default defineComponent({
    props: {
        movie: {
            type: Object as () => Movie,
            required: true,
        },
    },
    setup(props) {
        const movieDetail = ref({});
        const loading = ref(false);
        const poster = ref('');

        async function updateMovieDetail(movie: Movie) {
            console.log('movie updated', movie);
            try {
                loading.value = true;
                if(movie.imdbID) {
                    // yes, i still remember that axios calls in components is bad
                    const { data }: {data: MovieDetail} = await axios.post(api.host + api.urls.movies, {
                        params: {
                            plot: 'full',
                            i: movie.imdbID
                        }
                    });
                    movieDetail.value = data;
                    poster.value = getPoster(data.Poster);
                } else {
                    throw new Error("Provided movie object without imdbID");
                }
               
            }catch(e) {
                console.error(e);
            } finally {
                loading.value = false;
            }
        }

        watch(() => props.movie, (movie: Movie) => {
            console.log('movie updated in watcher')
            updateMovieDetail(movie);            
        });

        return {
            movieDetail,
            loading,
            poster,
        }
    }
})
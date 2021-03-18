import { ref,  defineComponent, Ref, watch } from "vue";
import _ from 'lodash';
import api from '@/api';
import axios from "axios";
import MovieList from "@/components/MovieList/MovieList.vue";
import MovieDetail from "@/components/MovieDetail/MovieDetail.vue";
import { MovieResponse, Movie,} from "@/interfaces";

export default defineComponent({
    components: {
        MovieList,
        MovieDetail,
    },
    setup(){
        const query = ref('');

        const movies: Ref<Movie[]> = ref([]);
        const total = ref(0);
        const page = ref(1);
        const pages = ref(0);
        const responseErrorMessage = ref('');
        
        const Search = _.throttle(async() => {
            try {
                // I know that do axios calls in component is bad, 
                //this function have to be in store but I see it as overengineering for demo app
                const { data }: { data: MovieResponse } = await axios.post(api.host + api.urls.movies, {
                    params: {
                        s: query.value.trim(),
                        page: page.value,
                    }
                });                
                movies.value = [];
                if(data.totalResults && data.Search) {
                    responseErrorMessage.value = '';
                    movies.value.push(...data.Search);
                    total.value = parseInt(data.totalResults);
                    pages.value = Math.ceil(total.value / data.Search.length);
                } else if(data.Error) {
                    responseErrorMessage.value = data.Error;
                } else {
                    throw new Error('Bad response');
                }

            } catch(e) {
                console.error(e);
            }
        }, 1000)
        // set page to 1 when query changes
        watch(query, () => {
            page.value = 1;
        });

        const movieDetail = ref({});
        
        function ShowMovieDetail(movie: Movie) {
            console.log('movie passed', movie)
            movieDetail.value = movie;
        }

        async function HandlePagination(pageChange: number) {
            page.value += pageChange;
            await Search();
        }

        return {
            query,
            movies,
            total,
            responseErrorMessage,
            movieDetail,
            page,
            pages,

            Search,
            ShowMovieDetail,
            HandlePagination,
        }
    }
})
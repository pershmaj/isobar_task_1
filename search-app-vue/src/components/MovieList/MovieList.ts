import { defineComponent } from "@vue/runtime-core";
import { Movie } from '@/interfaces';
import MovieListItem from '@/components/MovieListItem/MovieListItem.vue';

export default defineComponent({
    props: {
        movies: {
            type: Array as () => Movie[],
            required: false,
        },
        error: {
            type: String,
            required: false,
        }
    },
    emits: ['showDetail'],
    components: {
        MovieListItem,
    },
    setup(_, { emit }) {

        function ShowDetail(movie: Movie) {
            emit('showDetail', movie);
        }

        return {
            ShowDetail,
        };
    }
})
import { Movie } from "@/interfaces";
import { defineComponent } from "@vue/runtime-core";
import { getPoster } from "@/utils";

export default defineComponent({
    props: {
        movie: {
            type: Object as () => Movie,
            required: true,
        }
    },
    emits: ['showDetail'],
    setup(props, { emit }) {
        const poster = getPoster(props.movie.Poster);

        function ShowDetail() {
            emit('showDetail', props.movie);
        }
        return {
            poster,
            ShowDetail,
        };
    }
})
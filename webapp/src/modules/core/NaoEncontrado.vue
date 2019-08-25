<template>
    <v-container fill-height>
        <v-layout align-center justify-center row fill-height>
                <MascoteGif
                    :width="200"
                />
                <h1>P&aacute;gina n&atilde;o localizada ;( </h1>
        </v-layout>
    </v-container>
</template>

<script>
    import MascoteGif from "../../components/genericos/MascoteGif";
    export default {
        name: 'NaoEncontrado',
        components: {MascoteGif}
    }
</script>

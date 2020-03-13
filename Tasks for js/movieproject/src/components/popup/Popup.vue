<template>
    <div :class="{'modal':true,'fade': true,'show':getPopup.show}" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-if="!getPopup.error">Место забронировано</h5>
                    <h5 class="modal-title" v-if="getPopup.error">Данное место занято!</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closePopup">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" v-if="!getPopup.error">
                     Номер вашего билета: {{getPopup.reservCode}}
                </div>
                <div class="modal-body" v-if="getPopup.error">
                     Извините! Данное место занято! Попробуйте выбрать другое.
                </div>
            </div>
        </div>
    </div>
</template>
<script type="ts">
    import {mapGetters} from "vuex";

    export default {
        name: 'Popup',
        data(){
            return{

            }
        },
        computed:{
            ...mapGetters([
                'getPopup',
            ])
        },
        methods:{
            closePopup(){
                this.$store.dispatch('togglePopup', {show:false,error: false});
            }
        }
    }
</script>
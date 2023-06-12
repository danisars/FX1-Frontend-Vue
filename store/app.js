import { getField, updateField } from 'vuex-map-fields'

export const state = () => {
  return {
    showOnlineMembers: false,
    onHomePageLoad: false,
    showLoader: true,
    activeSports: [],
    activeLeagues: '',
    activePartners: [],
    activePartnersString: '',
    activeSport: 'all',
    showLiveChat: true,
    selectedGameID: null,
    selectedGameEventRoom: null,
  }
}

export const getters = {
  getField,
}

export const mutations = {
  updateField,
  updateSelectedGameID(state, value) {
    state.selectedGameID = value;
  },
  setSelectedGameEventRoom(state, value) {
    state.selectedGameEventRoom = value;
  },
  toggleActiveSport (state, value) {
    const index = state.activeSports.indexOf(value)
    if (index === -1) {
      let selectedValues = [];
      state.activeSports.push(value);
    } else {
      state.activeSports.splice(index, 1);
    }
    
    if(state.activeSports.length > 0) { 
      const selectedLeagueCodes = state.activeSports.toString().split(',');
      let leagueCodesString = '';
      selectedLeagueCodes.forEach(element => {
        if(element === 'baseball') leagueCodesString += 'mlb,';
        else if(element === 'basketball') leagueCodesString += 'wnba,nba,ncaab,';
        else if(element === 'ice-hockey') leagueCodesString += 'nhl,';
        else if(element === 'soccer') leagueCodesString += 'mls,epl,concacaf,efl,uefa,';
        else leagueCodesString += "";
      });
      if(leagueCodesString != '') {
        leagueCodesString = leagueCodesString.substring(0,leagueCodesString.length-1)
      }
      state.activeLeagues = leagueCodesString;
    }
    return (true);
  },
  toggleActivePartner (state, value) {
    const index = state.activePartners.indexOf(value)
    if (index === -1) {
      state.activePartners.push(value)
    } else {
      state.activePartners.splice(index, 1)
    }

    if(state.activePartners.length > 0) { 
      state.activePartnersString = state.activePartners.toString();
    }
    return (true)
  }
}

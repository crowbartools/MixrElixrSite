import React from 'react';
import { 
    Route,
    Switch
} from "react-router-dom";

import EmoteLibrary from "../components/pages/emotes/emote-library.component";
import Emote from "../components/pages/emotes/emote.component";
import CreateEmote from "../components/pages/emotes/create-emote.component";

export const EmotesView = ({ match }) => {
  return (
    <Switch>
        <Route exact path={match.url} component={EmoteLibrary} />
        <Route path={`${match.url}/create/`} component={CreateEmote} />
        <Route path={`${match.url}/library/`} component={EmoteLibrary} />
        <Route path={`${match.url}/:id/`} component={Emote} />
    </Switch>
  )
};


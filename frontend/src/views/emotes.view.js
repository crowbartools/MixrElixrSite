import React from 'react';
import { 
    Route,
    Switch
} from "react-router-dom";

import Emotes from "../components/emotes/emotes.component";
import Emote from "../components/emotes/emote.component";
import CreateEmote from "../components/emotes/createEmotes.component";

export const EmotesView = ({ match }) => {
  return (
    <div>
        <Switch>
            <Route exact path={match.url} component={Emotes} />
            <Route path={`${match.url}/create/`} component={CreateEmote} />
            <Route path={`${match.url}/:id/`} component={Emote} />
        </Switch>
    </div>
  )
};


import React from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';

import EmoteLibrary from 'components/pages/emotes/emote-library.component';
import Emote from 'components/pages/emotes/emote.component';
import CreateEmote from 'components/pages/emotes/create-emote.component';

export const EmotesView = (props: RouteComponentProps) => {
  return (
    <Switch>
      <Route exact path={props.match.url} component={EmoteLibrary} />
      <Route path={`${props.match.url}/create/`} component={CreateEmote} />
      <Route path={`${props.match.url}/library/`} component={EmoteLibrary} />
      <Route path={`${props.match.url}/:id/`} component={Emote} />
    </Switch>
  );
};

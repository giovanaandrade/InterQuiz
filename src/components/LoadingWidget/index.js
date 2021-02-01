import React from 'react';
import Loading from '../Animations/Loading';
import Widget from '../Widget';

export default function LoadingWidget() {
  return (

    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        <Widget.Animation>
          <Loading />
        </Widget.Animation>
      </Widget.Content>
    </Widget>
  );
}

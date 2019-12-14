import { bind } from 'decko';
import * as React from 'react';

interface IEmoteSubmitFormState {
  emoteImage: string;
  emoteSize: string;
  emoteCommand: string;
  emoteShared: string;
}

export default class EmoteSubmitForm extends React.Component<{}, IEmoteSubmitFormState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      emoteImage: '',
      emoteSize: '',
      emoteCommand: '',
      emoteShared: '',
    };
  }

  @bind
  private onChangeEmoteImage(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      emoteImage: e.target.value,
    });
  }

  @bind
  private onChangeEmoteSize(e: React.ChangeEvent<HTMLSelectElement>): void {
    this.setState({
      emoteSize: e.target.value,
    });
  }

  @bind
  private onChangeEmoteCommand(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      emoteCommand: e.target.value,
    });
  }

  @bind
  private onChangeEmoteShared(e: React.ChangeEvent<HTMLSelectElement>): void {
    this.setState({
      emoteShared: e.target.value,
    });
  }

  private onSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const emote = {
      emoteImage: this.state.emoteImage,
      emoteSize: this.state.emoteSize,
      emoteCommand: this.state.emoteCommand,
      emoteShared: this.state.emoteShared,
    };

    console.log(emote);

    window.location.assign('/');
  }

  public render(): JSX.Element {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className='emotePreview'>Emote</div>
          <div className='form-group'>
            <label htmlFor='emoteCommand'>Emote Name</label>
            <input type='text' required className='form-control' id='emoteCommand' placeholder='Pog' onChange={this.onChangeEmoteCommand} value={this.state.emoteCommand} />
          </div>
          <div className='form-group'>
            <label htmlFor='emoteSize'>Emote Size</label>
            <select required className='form-control' id='emoteSize' onChange={this.onChangeEmoteSize} value={this.state.emoteSize}>
              <option value='24'>24x24</option>
              <option value='30'>30x30</option>
              <option value='50'>50x50</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='emoteShared'>Emote Shared</label>
            <select required className='form-control' id='emoteShared' onChange={this.onChangeEmoteShared} value={this.state.emoteShared}>
              <option value='false'>No</option>
              <option value='true'>Yes</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='emoteUpload'>Emote Upload</label>
            <input required type='file' className='form-control-file' id='emoteUpload' onChange={this.onChangeEmoteImage} value={this.state.emoteImage} />
          </div>
        </form>
      </div>
    );
  }
}

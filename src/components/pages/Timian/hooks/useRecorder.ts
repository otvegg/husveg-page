import { MutableRefObject, useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
//https://huynvk.dev/blog/record-and-download-video-in-your-browser-using-javascript

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

interface readyBlobs {
  source: string;
  data: Blob;
}

const useRecorder = () => {
  const [recorder, setRecorder] = useState<MediaRecorder | undefined>();
  const [blobsToDownload, updateBlobsToDownload] = useState<readyBlobs[]>();
  const initStream = async (source: boolean) => {
    console.log(navigator.mediaDevices.getSupportedConstraints());
    navigator.mediaDevices;
    const stream = await (source
      ? navigator.mediaDevices.getDisplayMedia({ audio: true, video: true /* , aspectRatio: 19/6  */ })
      : navigator.mediaDevices.getUserMedia({ audio: true, video: true }));
    return stream;
  };

  const detectMIME = () => {
    const mimeTypes = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];

    for (const mimeType of mimeTypes) {
      if (MediaRecorder.isTypeSupported(mimeType)) {
        return mimeType;
      }
    }
    return '';
  };

  const beginRecording = async (
    source: boolean,
    onStreamReady: (stream: MediaStream) => void,
    onFinished: (recordedBlobs: Blob[], source: boolean) => void
  ) => {
    const stream = await initStream(source);
    console.log(
      stream.getTracks().forEach((track) => {
        console.log(track.getConstraints());
        track.applyConstraints({ aspectRatio: 16 / 9 });
      })
    );
    onStreamReady(stream);
    const options = { mimeType: detectMIME() };
    const recordedBlobs: Blob[] = [];

    const mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = (event: BlobEvent) => {
      if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      console.log('onstop');
      onFinished(recordedBlobs, source);
      console.log(stream);
      stopMediaStream(stream);
    };

    mediaRecorder.start();

    return mediaRecorder;
  };

  const stopMediaStream = async (stream: MediaStream) => stream.getTracks().forEach((track) => track.stop());
  const combineBlobs = (recordedBlobs: BlobPart[]) => {
    return new Blob(recordedBlobs, { type: 'video/webm' });
  };
  /**
   * Enables or disables the recording
   * @param source true = record screen, false = camera recording
   */
  const toggleRecorder = async (source: boolean, videoContainer: MutableRefObject<HTMLVideoElement | null>) => {
    try {
      if (recorder) {
        console.log('recorder', recorder);
        recorder.stop();
        setRecorder(undefined);
      } else {
        console.log('videocontainer', videoContainer);
        const mRecorder = await beginRecording(
          source,
          (stream: MediaStream) => {
            if (videoContainer.current) videoContainer.current.srcObject = stream;
          },
          (recordedBlobs: Blob[], source: boolean) => {
            const newBlob = combineBlobs(recordedBlobs);
            if (blobsToDownload)
              updateBlobsToDownload([...blobsToDownload, { source: source ? 'screen' : 'camera', data: newBlob }]);
            else updateBlobsToDownload([{ source: source ? 'screen' : 'camera', data: newBlob }]);
          }
        );
        console.log('mrecorder finished', mRecorder);
        setRecorder(mRecorder);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const download = (/* blobs: Blob[] | undefined = undefined */) => {
    //Potentially divide blobs into larger chunks in combineBlobs (to avoid nuking RAM)
    //https://stackoverflow.com/a/41410906

    const transform = (timeUnit: number) => {
      return timeUnit.toString().length > 1 ? timeUnit : '0' + (timeUnit + 1);
    };

    const date = new Date();
    const month = transform(date.getMonth() + 1);
    const day = transform(date.getDate());
    const minutes = transform(date.getMinutes());
    const hours = transform(date.getHours());
    const dateString = date.getFullYear() + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
    try {
      console.log('to download:', blobsToDownload);
      if (blobsToDownload) {
        const d = blobsToDownload.pop();
        if (d) {
          console.log(formatBytes(d.data.size) + 'bytes');
          saveAs(d.data, 'timian-' + d.source + '-' + dateString);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const isRecording = !!recorder;
  return { toggleRecorder, download, isRecording };
};

export default useRecorder;

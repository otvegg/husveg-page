import { MutableRefObject, useState } from 'react';
import { saveAs } from 'file-saver';
import _ from 'lodash';
import { videoBlob } from '../../../../utils/interfaces-types';
import { formatBytes, getDateString } from '../../../../utils/util';
//https://huynvk.dev/blog/record-and-download-video-in-your-browser-using-javascript

const useRecorder = () => {
  const [recorder, setRecorder] = useState<MediaRecorder | undefined>();
  const [blobsToDownload, updateBlobsToDownload] = useState<videoBlob[]>();

  const initStream = async (source: boolean) => {
    navigator.mediaDevices;
    const stream = await (source
      ? navigator.mediaDevices.getDisplayMedia({ audio: true, video: true /* , aspectRatio: 19/6  */ })
      : navigator.mediaDevices.getUserMedia({ audio: true, video: true }));
    return stream;
  };

  const detectMIME = () => {
    const mimeTypes = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
    for (const mimeType of mimeTypes) if (MediaRecorder.isTypeSupported(mimeType)) return mimeType;
    return '';
  };

  const beginRecording = async (
    source: boolean,
    onStreamReady: (stream: MediaStream) => void,
    onFinished: (recordedBlobs: Blob[], source: boolean) => void
  ) => {
    const stream = await initStream(source);
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
      onFinished(recordedBlobs, source);
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
        recorder.stop();
        setRecorder(undefined);
      } else {
        const mRecorder = await beginRecording(
          source,
          (stream: MediaStream) => {
            if (videoContainer.current) videoContainer.current.srcObject = stream;
          },
          (recordedBlobs: Blob[], source: boolean) => {
            const newBlob = combineBlobs(recordedBlobs);
            if (blobsToDownload)
              updateBlobsToDownload([
                ...blobsToDownload,
                {
                  id: _.uniqueId((source ? 'screen' : 'camera') + '-'),
                  type: source ? 'screen' : 'camera',
                  data: newBlob,
                },
              ]);
            else
              updateBlobsToDownload([
                {
                  id: _.uniqueId((source ? 'screen' : 'camera') + '-'),
                  type: source ? 'screen' : 'camera',
                  data: newBlob,
                },
              ]);
          }
        );
        setRecorder(mRecorder);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getBlobs = () => {
    return blobsToDownload ? blobsToDownload : [];
  };

  const download = (/* blobs: Blob[] | undefined = undefined */) => {
    //Potentially divide blobs into larger chunks in combineBlobs (to avoid nuking RAM)
    //https://stackoverflow.com/a/41410906

    try {
      console.log('to download:', blobsToDownload);
      if (blobsToDownload) {
        const d = blobsToDownload.pop();
        if (d && d.data) {
          console.log(formatBytes(d.data.size) + 'bytes');
          saveAs(d.data, 'timian-' + d.type + '-' + getDateString());
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  const downloadBlob = (blobId: string) => {
    const blob = blobsToDownload?.find((b) => b.id === blobId);
    if (blob && blob.data) saveAs(blob.data, blob.id + '-' + getDateString());
  };

  const isRecording = !!recorder;
  return { toggleRecorder, download, downloadBlob, isRecording, getBlobs };
};

export default useRecorder;

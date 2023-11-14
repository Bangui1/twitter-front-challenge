import React from "react";
import TweetBox from "../tweet-box/TweetBox";
import { PostModal } from "../post-modal/PostModal";
import {createPortal} from "react-dom";

interface TweetModalProps {
  open: boolean;
  onClose: () => void;
}

export const TweetModal = ({ open, onClose }: TweetModalProps) => {
  return createPortal(
    <>
      <PostModal show={open} onClose={onClose}>
        <TweetBox close={onClose} />
      </PostModal>
    </>
  , document.body);
};
export default TweetModal;

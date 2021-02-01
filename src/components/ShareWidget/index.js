import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  TwitterShareButton, TwitterIcon,
  FacebookShareButton, FacebookIcon,
  WhatsappIcon, WhatsappShareButton,
  TelegramIcon, TelegramShareButton,
} from 'react-share';

export default function ShareWidget({ shareUrl, quote }) {
  return (
    <>

      <motion.div
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.9 }}
      >
        <TwitterShareButton url={shareUrl} title={quote}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.9 }}
      >
        <FacebookShareButton url={shareUrl} quote={quote}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.9 }}
      >
        <WhatsappShareButton url={shareUrl} quote={quote}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.9 }}
      >
        <TelegramShareButton url={shareUrl} quote={quote}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </motion.div>
    </>
  );
}

ShareWidget.propTypes = {
  shareUrl: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
};

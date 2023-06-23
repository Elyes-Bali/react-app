import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import MainButton from 'src/Components/MainButton';
import { StyledTextarea } from '../EnterpriseDetails';
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from 'src/firebase-config';
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { DeleteButton } from '../AdminDashboard/EnterprisesList';
import { useTranslation } from 'react-i18next';
let seen = 'consulté';
let processing = 'En cours de traitement';
let processed = 'traité';

function QuoteItem({ quote, type, refresh, setrefresh }) {
  const [quoteProgress, setquoteProgress] = useState(0);
  const [response, setresponse] = useState('');
  const [quoteStatus, setquoteStatus] = useState(null);
  const [currentQuoteId, setcurrentQuoteId] = useState('');
  const [selectedQuote, setselectedQuote] = useState(null);

  async function setFirstState(status, uid) {
    handleClickOpen();
    setquoteProgress(1);
    setquoteStatus(status);
    await SaveQuoteRequest(status, uid);
  }

  /**
   * @param {string} status
   * @param {string} [uid]
   */
  async function SaveQuoteRequest(status, uid) {
    const myDocRef = doc(db, 'quotes', uid);
    let data = {
      status: status,
      message: response
    };
    await updateDoc(myDocRef, data)
      .then(() => {
        console.log('Successfully updated quote status');
      })
      .catch((err) => console.log(err));
  }

  const [open, setOpen] = React.useState(false);
  const [openDelete, setopenDelete] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { t, i18n } = useTranslation();

  const [form, setForm] = useState({
    name: quote.firstname,
    email: quote.email,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
      const { target } = e;
      const { name, value } = target;
  
      setForm({
        ...form,
        [name]: value,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_t1wi5eu',
       'template_5e25dkx',
        {
          from_name: form.name,
          to_name: "Elyes Bali",
          from_email: form.email,
          to_email: "balielyes7@gmail.com",
          message: form.message,
        },
        '8BLa2RtIQ6TvjS--c'
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. We will get back to you as soon as possible.");

          setForm({
            name: quote.firstname,
            email: quote.email,
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };


  // const sendEmail = (e) => {
  //   e.preventDefault(); // prevents the page from reloading when you hit “Send”

  //   emailjs
  //     .send(
  //       'service_pt78wff',
  //       'template_mjh3d6t',
  //       { to_name: quote.firstname, message: response, reply_to: quote.email },
  //       'vpOkpOZeoKn683Wci'
  //     )
  //     .then(
  //       (result) => {
  //         // show the user a success message
  //         console.log('Email envoyé avec successs');
  //         alert('Email envoyé avec success');
  //       },
  //       (error) => {
  //         // show the user an error
  //         console.log("Echec lors de l'envoi");
  //       }
  //     );
  // };
  const notify = () => toast('Votre demande de devis a été supprimée avec succès');

  async function deleteQuote(id) {
    // Deleting document with ID 'documentId' from collection 'collectionName'
    await deleteDoc(doc(db, 'quotes', id))
      .then(() => {
        console.log('Successfully updated quote status');
        notify();
        setrefresh(!refresh);
      })
      .catch((err) => console.log(err));
  }
  async function setSecondState(status, uid) {
    setquoteProgress(2);
    setquoteStatus(status);
    await SaveQuoteRequest(status, uid);
    handleClose();
  }

  async function handleQuoteMessage(e, uid) {
    let inputValue = e.target.value;
    setcurrentQuoteId(uid);
    setresponse(inputValue);
    if (inputValue.length == 1) {
      await SaveQuoteRequest(processing, uid);
    }
  }
  return (
    <Box
      style={{
        margin: '20px',
        padding: '15px',
        backgroundColor: '#f2f3f4',
        borderRadius: '15px',
        borderRight: '#00bd9a 2px solid'
      }}
    >
      <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography style={{ fontSize: '17px', fontWeight: '600', marginRight: '5px' }}>
            {t('quote request')} :
          </Typography>
          <Typography style={{ fontSize: '17px', fontWeight: '600' }}>{quote.quoteTitle}</Typography>
        </Box>
        <Box sx={{ width: '20%' }}>
          {type == 0 && (
            <DeleteButton
              onClick={() => {
                setselectedQuote(quote.uid);
                setopenDelete(true);
              }}
              autoFocus
            >
              {t('delete')}
            </DeleteButton>
          )}
          {type == 1 && <MainButton text={t('See')} onClick={() => setFirstState(seen, quote.uid)} />}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}></Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" sx={{ padding: '50px' }}>
        {quote.quoteTitle ? (
          <DialogTitle id="alert-dialog-title">{quote.quoteTitle}</DialogTitle>
        ) : (
          <DialogTitle id="alert-dialog-title">{t('quote request')} </DialogTitle>
        )}
        <DialogContent>
          <Box
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: 'fit-content' }}
            display="inline-block"
            width="fit-content"
          >
            <Box style={{ flex: 1 }} display="inline-block" width="fit-content">
              <Box
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                display="inline-block"
                width="fit-content"
              >
                <Typography style={{ padding: '5px' }}>{t('name')} :</Typography>
                <Typography>{quote.lastname}</Typography>
              </Box>
              <Box
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                display="inline-block"
                width="fit-content"
              >
                <Typography style={{ padding: '5px' }}>{t('firstname')} :</Typography>
                <Typography>{quote.firstname}</Typography>
              </Box>
              <Box
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                display="inline-block"
                width="fit-content"
              >
                <Typography style={{ padding: '5px' }}>{t('address')} :</Typography>
                <Typography>{quote.address}</Typography>
              </Box>
            </Box>
            <Box style={{ flex: 1 }}>
              <Box
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                display="inline-block"
                width="fit-content"
              >
                <Typography style={{ padding: '5px' }}>{t('phoneNumber')} :</Typography>
                <Typography>{quote.phoneNumber}</Typography>
              </Box>
              <Box
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                display="inline-block"
                width="fit-content"
              >
                <Typography style={{ padding: '5px' }}>{t('email')} :</Typography>
                <Typography>{quote.email}</Typography>
              </Box>
            </Box>
          </Box>
          {quoteProgress > 0 && (
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography style={{ margin: '5px' }}>Message :</Typography>
              <Typography style={{ margin: '5px' }}>{quote.message}</Typography>
            </Box>
          )}

          {quoteProgress > 0 && (
            <StyledTextarea
              
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What do you want to say?"
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
          />
            
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('cancel')}</Button>

          <Button
            onClick={(e) => {
              setSecondState(processed, quote.uid);
              handleSubmit(e);
            }}
            autoFocus
          >
            {t('answer')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={() => setopenDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('confirm deletion')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{t('are you sure you want to delete')} ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopenDelete(false)}> {t('cancel')}</Button>
          <Button
            onClick={() => {
              deleteQuote(selectedQuote);
              setopenDelete(false);
            }}
            autoFocus
          >
            {t('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default QuoteItem;

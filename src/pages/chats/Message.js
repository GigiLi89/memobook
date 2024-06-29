import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/Message.module.css';

const Message = () => {
  const { id } = useParams();
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState('');
  const [receiverImage, setReceiverImage] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingMessageContent, setEditingMessageContent] = useState('');
  const currentUser = useCurrentUser();

  const createChat = useCallback(async () => {
    await axios.post(`/chats/`, { receiver: id });
  }, [id]);

  const getChatList = useCallback(async () => {
    const res = await axios.get('/chats');
    setChatList(res.data.results);
    if (res.data.results.length) {
      if (!chatList.find(d => d.receiver.toString() === id.toString())) {
        await createChat();
        await getChatList();
      }
    } else {
      await createChat();
      await getChatList();
    }
  }, [chatList, id, createChat]);

  async function getChatDetails(id) {
    const res = await axios.get(`/chats/${id}/messages`);
    setMessages(res.data.results);
  }

  async function sendMessage() {
    try {
      await axios.post(`/chats/${selectedChat}/messages/`, { message });
      await getChatDetails(selectedChat);
      setMessage('');
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteMessage(messageId) {
    try {
      await axios.delete(`/chats/${selectedChat}/messages/${messageId}/`);
      await getChatDetails(selectedChat);
      toast.success('Message deleted successfully!');
    } catch (err) {
      console.log(err);
      toast.error('Failed to delete message.');
    }
  }
  
  async function editMessage(messageId, newContent) {
    try {
      await axios.put(`/chats/${selectedChat}/messages/${messageId}/`, { message: newContent });
      await getChatDetails(selectedChat);
      toast.success('Message edited successfully!');
    } catch (err) {
      console.log(err);
      toast.error('Failed to edit message.');
    }
  }

  const handleEditClick = (messageId, currentContent) => {
    setEditingMessageId(messageId);
    setEditingMessageContent(currentContent);
  };

  const handleEditSave = (messageId) => {
    editMessage(messageId, editingMessageContent);
    setEditingMessageId(null);
    setEditingMessageContent('');
  };

  useEffect(() => {
    getChatList();
  }, [id, getChatList]);

  useEffect(() => {
    if (selectedChat) {
      getChatDetails(selectedChat);
    }
  }, [selectedChat]);

  if (!currentUser) {
    return <p>Please sign in to view your messages.</p>;
  }

  return (
    <div>
      <ToastContainer />
      <p className={styles.messageContainer}>
        Messages, keep in touch with your loved ones!
        <br />
        Click on the profile you would like to send a message to, write your content in the text field and click send!
      </p>
      <Row>
        <Col lg={4}>
          {chatList.map(d => (
            <div
              className={`${styles.chatItem} ${d.id === selectedChat ? styles.chatItemSelected : ''}`}
              key={d.id}
              onClick={() => {
                setSelectedChat(d.id);
                setReceiver(d.receiver_username);
                d.receiver_username === currentUser.username ? setReceiverImage(d.sender_image) : setReceiverImage(d.receiver_image);
              }}
            >
              <div>
                <img src={d.receiver_image} width={60} height={60} alt='Receiver' /> {}
              </div>
              {d.receiver_username === currentUser.username ? (
                <h5 className='ml-3 font-bold'>{d.sender}</h5>
              ) : (
                <h5 className='ml-3 font-bold'>{d.receiver_username}</h5>
              )}
            </div>
          ))}
        </Col>
        <Col lg={8} style={{ border: '1px solid black' }}>
          <div className={`d-flex flex-column ${styles.messageBox}`}>
            <div className={styles.messageList}>
              <div className='d-flex flex-column mt-4'>
                {messages?.map(d => (
                  d.receiver === currentUser.username ? (
                    d.sender !== receiver ? (
                      <div className={`d-flex align-items-center mb-2 justify-content-start ${styles.message}`}>
                        <img src={receiverImage} width={60} height={60} alt='Receiver' /> {}
                        {editingMessageId === d.id ? (
                          <>
                            <Form.Control
                              value={editingMessageContent}
                              onChange={(e) => setEditingMessageContent(e.target.value)}
                            />
                            <Button variant='success' onClick={() => handleEditSave(d.id)} style={{ marginLeft: '10px' }}>
                              Save
                            </Button>
                          </>
                        ) : (
                          <p className={styles.messageContent}>{d.message}</p>
                        )}
                        <Button variant='danger' onClick={() => deleteMessage(d.id)} style={{ marginLeft: '10px' }}>
                          Delete
                        </Button>
                        {editingMessageId !== d.id && (
                          <Button variant='primary' onClick={() => handleEditClick(d.id, d.message)} style={{ marginLeft: '10px' }}>
                            Edit
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className={`d-flex align-items-center mb-2 justify-content-end ${styles.messageEnd}`}>
                        {editingMessageId === d.id ? (
                          <>
                            <Form.Control
                              value={editingMessageContent}
                              onChange={(e) => setEditingMessageContent(e.target.value)}
                            />
                            <Button variant='success' onClick={() => handleEditSave(d.id)} style={{ marginLeft: '10px' }}>
                              Save
                            </Button>
                          </>
                        ) : (
                          <p className={`${styles.messageContent} ${styles.messageContentEnd}`}>{d.message}</p>
                        )}
                        <img
                          className={styles.receiverImage}
                          src={currentUser.profile_image}
                          width={60}
                          height={60}
                          alt='Current User'
                        /> {}
                        <Button variant='danger' onClick={() => deleteMessage(d.id)} style={{ marginLeft: '10px' }}>
                          Delete
                        </Button>
                        {editingMessageId !== d.id && (
                          <Button variant='primary' onClick={() => handleEditClick(d.id, d.message)} style={{ marginLeft: '10px' }}>
                            Edit
                          </Button>
                        )}
                      </div>
                    )
                  ) : (
                    d.sender === receiver ? (
                      <div className={`d-flex align-items-center mb-2 justify-content-start ${styles.message}`}>
                        <img src={receiverImage} width={60} height={60} alt='Receiver' /> {}
                        {editingMessageId === d.id ? (
                          <>
                            <Form.Control
                              value={editingMessageContent}
                              onChange={(e) => setEditingMessageContent(e.target.value)}
                            />
                            <Button variant='success' onClick={() => handleEditSave(d.id)} style={{ marginLeft: '10px' }}>
                              Save
                            </Button>
                          </>
                        ) : (
                          <p className={styles.messageContent}>{d.message}</p>
                        )}
                        <Button variant='danger' onClick={() => deleteMessage(d.id)} style={{ marginLeft: '10px' }}>
                          Delete
                        </Button>
                        {editingMessageId !== d.id && (
                          <Button variant='primary' onClick={() => handleEditClick(d.id, d.message)} style={{ marginLeft: '10px' }}>
                            Edit
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className={`d-flex align-items-center mb-2 justify-content-end ${styles.messageEnd}`}>
                        {editingMessageId === d.id ? (
                          <>
                            <Form.Control
                              value={editingMessageContent}
                              onChange={(e) => setEditingMessageContent(e.target.value)}
                            />
                            <Button variant='success' onClick={() => handleEditSave(d.id)} style={{ marginLeft: '10px' }}>
                              Save
                            </Button>
                          </>
                        ) : (
                          <p className={`${styles.messageContent} ${styles.messageContentEnd}`}>{d.message}</p>
                        )}
                        <img
                          className={styles.receiverImage}
                          src={currentUser.profile_image}
                          width={60}
                          height={60}
                          alt='Current User'
                        /> {}
                        <Button variant='danger' onClick={() => deleteMessage(d.id)} style={{ marginLeft: '10px' }}>
                          Delete
                        </Button>
                        {editingMessageId !== d.id && (
                          <Button variant='primary' onClick={() => handleEditClick(d.id, d.message)} style={{ marginLeft: '10px' }}>
                            Edit
                          </Button>
                        )}
                      </div>
                    )
                  )
                ))}
              </div>
            </div>
            <div className={styles.inputGroup}>
              <InputGroup className='mb-3'>
                <Form.Control
                  placeholder='Send message'
                  aria-label='send message'
                  aria-describedby='basic-addon2'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button variant='outline-secondary' id='button-addon2' onClick={() => sendMessage()}>
                  Send
                </Button>
              </InputGroup>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Message;

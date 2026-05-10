import React from 'react';
import { BaseToast, ErrorToast, ToastConfigParams } from 'react-native-toast-message';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export const toastConfig = {
  
  success: (props: ToastConfigParams<Record<string, unknown>>) => (
    <BaseToast
      {...props}
      style={styles.baseToast}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={styles.text1}   
      text2Style={styles.text2}
      renderLeadingIcon={() => (
        <FontAwesomeIcon icon={faCheckCircle} size={18} color="#00897B" style={styles.icon}/>
      )}
    />
  ),

  error: (props: ToastConfigParams<Record<string, unknown>>) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      text1Style={styles.text1}
      text2Style={styles.text2}
      renderLeadingIcon={() => (
        <FontAwesomeIcon icon={faTimesCircle} size={18} color="#EF4444" style={styles.icon} />
      )}
    />
  ),
}

const styles = StyleSheet.create({
  
  baseToast:{
    borderLeftColor: '#00897B',
    backgroundColor: '#ECFDF5',
    borderRadius: 8,
  },
  errorToast:{
    borderLeftColor: '#EF4444',
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
  },
  icon:{
    marginLeft:8,
    marginTop:15
  },
  text1:{
    fontSize: 12,
    fontWeight: 'bold'
  },
  text2:{
    fontSize:10,
  },
  
});
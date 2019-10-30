#!/usr/bin/python3

from pymodbus.client.sync import ModbusTcpClient as ModbusClient
from pymodbus.payload import BinaryPayloadDecoder
from pymodbus.constants import Endian
from pymongo import MongoClient
import serial
import sys


class ModBus_API:

    def __init__(self, IP_ADDRESS='169.254.167.246'):
        self.MIN_SIGNED = -2147483648
        self.MAX_UNSIGNED = 4294967295
        self.COLOR_CONTROL_IP = IP_ADDRESS
        self.client = None

    def connect_to_ccgx(self):
        try:
            self.client = ModbusClient(self.COLOR_CONTROL_IP, port='502')
            if(self.client.connect()):
                print('Successfully connected to: {0}'.format(
                    self.COLOR_CONTROL_IP))
            else:
                print('Error while connecting to: {0}'.format(
                    self.COLOR_CONTROL_IP))
        except:
            print('Error connecting')

    def read_device_data(self, address, unit, count=1, d_type='int32'):
        received = self.client.read_input_registers(
            address=address, count=count, unit=unit)
        message = BinaryPayloadDecoder.fromRegisters(
            received.registers, Endian.Big)
        if d_type == 'int32':
            interpreted = message.decode_32bit_int()
        elif d_type == 'uint32':
            interpreted = message.decode_32bit_uint()
        elif d_type == 'iunt:64':
            interpreted = message.decode_64bit_uint()
        elif d_type == 'str32':
            interpreted = message.decode_string(32)
        elif d_type == 'int16':
            interpreted = message.decode_16bit_int()
        elif d_type == 'uint16':
            interpreted = message.decode_16bit_uint()
        else:  # if no data type is defined do raw interpretation of the delivered data
            interpreted = message.decode_16bit_uint()
        return interpreted

    def close(self):
        self.client.close()

    def battery_state_map(self, n):
        n = int(n)
        if n == 0:
            return 'idle'
        elif n == 1:
            return 'charging'
        elif n == 2:
            return 'discharging'

    def show_data(self):
        data ={
        'Battery voltage' : self.read_device_data(840, 100, d_type='uint16')/10.0,
        'Battery current' : self.read_device_data(841, 100, d_type='int16')/10.0,
        'Battery power' : self.read_device_data(842, 100, d_type='int16'),
        'Battery state of charge' : self.read_device_data(843, 100, d_type='uint16'),
        'Battery state' : self.battery_state_map(self.read_device_data(844, 100, d_type='int16')),
        'AC consumption' : self.read_device_data(817, 100, d_type='int16'),
        'vebus volt' : float(self.read_device_data(15, 246, d_type='uint16'))/10.0,
        'vebus current' : float(self.read_device_data(18, 246, d_type='int16'))/10.0
        }
        return data


port = "/dev/ttyACM0"  # USB port where Arduino is connected
s1 = serial.Serial(port, 9600, timeout= 10000)  # Start the serial port
s1.flushInput()


def make_json(line):
    parts = line.decode('utf8').split(',')
    print("parts: ", parts)
    var_names = parts[0].split(';')
    values = parts[1].strip('\r\n').split(';')
    json_body = ''
    # print(var_names)
    # print(values)
    for i in range(len(var_names)):
        if i == len(var_names):
            json_body += '\"{0}\":{1}\n'.format(var_names[i], values[i])
        json_body += '\"{0}\":{1},\n'.format(var_names[i], values[i])
    last_comma_index = json_body.rfind(',')
    json_body = json_body[:last_comma_index]+json_body[last_comma_index+1:]
    return '{\n'+'{0}'.format(json_body)+'}'


x = ModBus_API()
x.connect_to_ccgx()

'''while True:
    try:
        if s1.inWaiting() > 0:
            line = s1.readline()
            if len(line) > 1:
                #print(x.show_data())
                print("json: ",make_json(line))
    except:
        print("error unexpected:", sys.exc_info()[0])	
        raise
'''